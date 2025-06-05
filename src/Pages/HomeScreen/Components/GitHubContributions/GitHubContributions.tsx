import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Calendar, GitBranch, Star, GitCommit, AlertCircle } from "lucide-react";

interface ContributionDay {
  date: string;
  level: number; // 0-4 intensity levels
  count: number;
}

interface GitHubContributionResponse {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: Array<{
          contributionDays: Array<{
            contributionCount: number;
            date: string;
          }>;
        }>;
      };
    };
  };
}

// GitHub API service
const fetchGitHubContributions = async (username: string): Promise<ContributionDay[]> => {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Note: You'll need to set up environment variables for the GitHub token
        'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_TOKEN || ''}`,
      },
      body: JSON.stringify({
        query,
        variables: { username }
      })
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data: { data: GitHubContributionResponse } = await response.json();
    
    if (!data.data?.user?.contributionsCollection) {
      throw new Error('User not found or no contribution data available');
    }

    // Transform GitHub API response to our format
    const contributions: ContributionDay[] = [];
    
    data.data.user.contributionsCollection.contributionCalendar.weeks.forEach(week => {
      week.contributionDays.forEach(day => {
        // Convert count to intensity level (0-4)
        let level = 0;
        if (day.contributionCount > 0) {
          if (day.contributionCount >= 20) level = 4;
          else if (day.contributionCount >= 10) level = 3;
          else if (day.contributionCount >= 5) level = 2;
          else level = 1;
        }

        contributions.push({
          date: day.date,
          count: day.contributionCount,
          level
        });
      });
    });

    return contributions;
  } catch (error) {
    console.error('Failed to fetch GitHub contributions:', error);
    throw error;
  }
};

// Configuration - Replace with your GitHub username
const GITHUB_USERNAME = 'apsmj23'; // TODO: Replace this with your actual GitHub username

const GitHubContributions = () => {
  const [contributionData, setContributionData] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch real GitHub contribution data
  useEffect(() => {
    const loadContributions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchGitHubContributions(GITHUB_USERNAME);
        setContributionData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load contributions');
        // Fallback to sample data if API fails
        setContributionData(generateSampleData());
      } finally {
        setLoading(false);
      }
    };

    loadContributions();
  }, []);

  // Fallback sample data generation
  const generateSampleData = () => {
    const data: ContributionDay[] = [];
    const today = new Date();
    
    // Generate exactly one year of data (365 days)
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const weekday = date.getDay();
      let level = 0;
      
      // More activity on weekdays
      if (weekday >= 1 && weekday <= 5) {
        level = Math.floor(Math.random() * 5);
      } else {
        level = Math.floor(Math.random() * 3);
      }
      
      // Occasional high activity days
      if (Math.random() > 0.85) {
        level = Math.min(4, level + 1);
      }
      
      // Some completely inactive days
      if (Math.random() > 0.7) {
        level = Math.max(0, level - 1);
      }
      
      data.push({
        date: date.toISOString().split('T')[0],
        level,
        count: level > 0 ? level * Math.floor(Math.random() * 4) + level : 0
      });
    }
    
    return data;
  };

  // Group data by weeks (properly aligned by calendar weeks)
  const getWeeksData = () => {
    if (contributionData.length === 0) return [];
    
    const weeks: ContributionDay[][] = [];
    const sortedData = [...contributionData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Find the first Sunday to start the grid properly
    const firstDate = new Date(sortedData[0].date);
    const startDate = new Date(firstDate);
    startDate.setDate(firstDate.getDate() - firstDate.getDay()); // Go back to Sunday
    
    // Create 53 weeks (one year)
    for (let week = 0; week < 53; week++) {
      const weekData: ContributionDay[] = [];
      
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + (week * 7) + day);
        const dateString = currentDate.toISOString().split('T')[0];
        
        // Find matching contribution data
        const contributionDay = sortedData.find(d => d.date === dateString);
        
        if (contributionDay) {
          weekData.push(contributionDay);
        } else {
          // Fill empty days
          weekData.push({
            date: dateString,
            level: 0,
            count: 0
          });
        }
      }
      
      weeks.push(weekData);
    }
    
    return weeks;
  };

  const getIntensityColor = (level: number) => {
    const colors = [
      'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700', // Level 0 - no activity
      'bg-green-200 dark:bg-green-900/70', // Level 1 - low
      'bg-green-300 dark:bg-green-800/80', // Level 2 - medium
      'bg-green-400 dark:bg-green-600/90', // Level 3 - high
      'bg-green-500 dark:bg-green-500'  // Level 4 - very high
    ];
    return colors[level] || colors[0];
  };

  const getTooltipText = (day: ContributionDay) => {
    if (day.count === 0) {
      return `No contributions on ${day.date}`;
    }
    return `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${day.date}`;
  };

  const totalContributions = contributionData.reduce((sum, day) => sum + day.count, 0);
  const streak = calculateStreak(contributionData);
  const bestDay = contributionData.reduce((max, day) => 
    day.count > max.count ? day : max, { count: 0 } as ContributionDay
  );

  function calculateStreak(data: ContributionDay[]) {
    let current = 0;
    let max = 0;
    
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].count > 0) {
        current++;
        max = Math.max(max, current);
      } else {
        current = 0;
      }
    }
    
    return max;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.02
      }
    }
  };



  const statsVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.section
      className="max-w-7xl mx-auto px-4 sm:px-5 py-8 sm:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div className="text-center mb-8 sm:mb-12" variants={statsVariants}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          GitHub Activity
        </h2>
        <motion.div
          className="h-1 w-16 sm:w-24 bg-gradient-to-r from-primary to-primary/40 rounded-full mx-auto mb-4 sm:mb-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
        <p className="text-muted-foreground text-base sm:text-lg px-4">
          {error ? 'Sample visualization of coding activity and contributions' : 'A visual representation of my coding activity and contributions'}
        </p>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div 
          className="mb-6 sm:mb-8 mx-auto max-w-2xl px-4"
          variants={statsVariants}
        >
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 sm:p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> Could not fetch live GitHub data ({error}). Showing sample data instead. 
                To display your real contribution data, please set up a GitHub token and update the username in the component.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {/* Stats Cards */}
        <motion.div className="lg:col-span-1 order-2 lg:order-1 space-y-3 sm:space-y-4" variants={statsVariants}>
          <Card>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                <GitCommit className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span>Activity Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-muted-foreground">Total</span>
                  <Badge variant="secondary" className="text-xs">
                    {loading ? '...' : totalContributions}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-muted-foreground">Best Day</span>
                  <Badge variant="secondary" className="text-xs">
                    {loading ? '...' : bestDay.count}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-muted-foreground">Current Streak</span>
                  <Badge variant="secondary" className="text-xs">
                    {loading ? '...' : `${streak} days`}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm">Activity Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">Less</span>
                <div className="flex space-x-1">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <motion.div
                      key={level}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm ${getIntensityColor(level)}`}
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">More</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contribution Graph */}
        <motion.div className="lg:col-span-3 order-1 lg:order-2" variants={statsVariants}>
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Contribution Activity</span>
                {loading && <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Mobile scroll hint */}
              <div className="sm:hidden text-xs text-muted-foreground mb-2 flex items-center">
                <span>← Scroll to view full year →</span>
              </div>
              
              <div className="overflow-x-auto pb-2">
                <div className="min-w-max">
                  {/* Month labels */}
                  <div className="flex mb-1 sm:mb-2 text-xs text-muted-foreground pl-8 sm:pl-10">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                      <div key={month} className="flex-1 text-center min-w-[28px] sm:min-w-[32px]">
                        {index % 2 === 0 && month}
                      </div>
                    ))}
                  </div>

                  {/* Day labels and Contribution squares container */}
                  <div className="flex">
                    <div className="flex flex-col text-xs text-muted-foreground mr-1 sm:mr-2 justify-around h-16 sm:h-20 w-6 sm:w-8">
                      <span className="text-xs">Mon</span>
                      <span className="text-xs">Wed</span>
                      <span className="text-xs">Fri</span>
                    </div>

                    {/* Contribution squares */}
                    <motion.div 
                      key={loading ? 'loading' : 'loaded'} // Force re-animation when data loads
                      className="grid grid-flow-col gap-0.5 sm:gap-1 min-h-[4rem] sm:min-h-[5rem]"
                      style={{ gridTemplateRows: 'repeat(7, 1fr)' }}
                      initial="hidden"
                      animate="visible"
                      variants={containerVariants}
                    >
                      {loading ? (
                        // Loading skeleton
                        Array.from({ length: 52 * 7 }, (_, i) => (
                          <motion.div
                            key={i}
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm bg-muted/50"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.001, duration: 0.3 }}
                          />
                        ))
                      ) : (
                        getWeeksData().map((week, weekIndex) =>
                          week.map((day, dayIndex) => {
                            const delay = (weekIndex * 7 + dayIndex) * 0.002;
                            return (
                              <motion.div
                                key={`${weekIndex}-${dayIndex}`}
                                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm cursor-pointer ${getIntensityColor(day.level)}`}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 20,
                                  delay: delay
                                }}
                                whileHover={{ 
                                  scale: 1.2,
                                  zIndex: 10,
                                  transition: { duration: 0.1 }
                                }}
                                whileTap={{ scale: 0.95 }}
                                title={getTooltipText(day)}
                              />
                            );
                          })
                        )
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <motion.div 
                className="mt-4 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="flex items-center space-x-1">
                  <GitBranch className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Learn more on GitHub</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Contributions include commits, PRs, and issues</span>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
  };
  
  export default GitHubContributions; 