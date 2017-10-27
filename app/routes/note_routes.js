// routes/note_routes.js
module.exports = function(app, db) {
    app.post('/matchjob', (req, res) => {
    var profilePersonality = req.body.personality
    //console.log(req.body.personality)
        
    let jobs = require('./jobs.json');
        
    for(i=0; i < jobs.job.length; i++)
    {
        jobs.job[i].Openness = Math.abs(profilePersonality[0].percentile-jobs.job[i].Openness);
        jobs.job[i].Conscientiousness = Math.abs(profilePersonality[0].percentile-jobs.job[i].Conscientiousness);
        jobs.job[i].Extraversion = Math.abs(profilePersonality[0].percentile-jobs.job[i].Extraversion);
        jobs.job[i].Agreeableness = Math.abs(profilePersonality[0].percentile-jobs.job[i].Agreeableness);
        jobs.job[i].Emotional_range = Math.abs(profilePersonality[0].percentile-jobs.job[i].Emotional_range);

        jobs.job[i].total = jobs.job[i].Openness+jobs.job[i].Conscientiousness+jobs.job[i].Extraversion+jobs.job[i].Agreeableness+jobs.job[i].Emotional_range;

        //console.log(jobs.job[i].Job_Title +" : "+ jobs.job[i].total);
    }
        
    var sortable = [];
    for (var job in jobs.job) {
        sortable.push([jobs.job[job].Job_Title, jobs.job[job].total]);
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
       colCurrentJob.description = sortable[job][0];
       
       colJobs.push(colCurrentJob);
       
   }
    
    //console.log(colJobs);
    
    res.send(colJobs);
    
    console.log("Response Sent");
    
  });
};