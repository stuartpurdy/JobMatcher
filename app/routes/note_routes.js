// routes/note_routes.js
module.exports = function(app, db) {
    app.post('/matchjob', (req, res) => {
    var profilePersonality = req.body.personality;
    //console.log(req.body.personality)
    
    var jobs = require('./jobs.json');
    
    var jobsCopy = JSON.parse(JSON.stringify(jobs));

    for(i=0; i < jobsCopy.job.length; i++)
    {
        jobsCopy.job[i].Openness = Math.abs(profilePersonality[0].percentile-jobsCopy.job[i].Openness);        
        jobsCopy.job[i].Conscientiousness = Math.abs(profilePersonality[1].percentile-jobsCopy.job[i].Conscientiousness);
        jobsCopy.job[i].Extraversion = Math.abs(profilePersonality[2].percentile-jobsCopy.job[i].Extraversion);
        jobsCopy.job[i].Agreeableness = Math.abs(profilePersonality[3].percentile-jobsCopy.job[i].Agreeableness);
        jobsCopy.job[i].Emotional_range = Math.abs(profilePersonality[4].percentile-jobsCopy.job[i].Emotional_range);

        jobsCopy.job[i].total = jobsCopy.job[i].Openness+jobsCopy.job[i].Conscientiousness+jobsCopy.job[i].Extraversion+jobsCopy.job[i].Agreeableness+jobsCopy.job[i].Emotional_range;

        //console.log(jobsCopy.job[i].Job_Title +" : "+ jobsCopy.job[i].total);
    }
    
    var sortable = [];
    for (var job in jobsCopy.job) {
        sortable.push([jobsCopy.job[job].Job_Title, jobsCopy.job[job].total, jobsCopy.job[job].description]);
    }
    
    //console.log(jobs);
    //console.log(sortable);
    
    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });
    
    console.log("Jobs Sorted");
    
   var colJobs = [];
    
   for (var job in sortable)
   {
       var colCurrentJob = {};
       colCurrentJob.job_title = sortable[job][0];
       colCurrentJob.correlation = sortable[job][1];
       colCurrentJob.description = sortable[job][2];
       
       colJobs.push(colCurrentJob);
       
   }
    
    //console.log(colJobs);
    
    res.send(colJobs);
    
    console.log("Response Sent");
    
  });
};