module.exports = function(){
  var express = require('express');
  var router = express.Router();

  function getProjects(res, mysql, context, complete){
      mysql.pool.query("SELECT Pnumber, Pname FROM PROJECT", function(error, results, fields){
          if(error){
              res.write(JSON.stringify(error));
              res.end();
          }
          context.projects  = results;
          complete();
      });
  }

  function getEmployees(res, mysql, context, complete){
      mysql.pool.query("SELECT Fname, Lname, Salary, Dno FROM EMPLOYEE", function(error, results, fields){
          if(error){
              res.write(JSON.stringify(error));
              res.end();
          }
          context.employee = results;
          complete();
      });
  }

  function getEmployeebyProject(req, res, mysql, context, complete){
    var query = "SELECT Fname, Lname, Salary, Dno FROM WORKS_ON, EMPLOYEE WHERE WORKS_ON.Essn = EMPLOYEE.Ssn AND WORKS_ON.Pno = ?";
    console.log(req.params)
    var inserts = [req.params.project]
    mysql.pool.query(query, inserts, function(error, results, fields){
          if(error){
              res.write(JSON.stringify(error));
              res.end();
          }
          context.employee = results;
                context.PNO = req.params.project;
          //complete();
      });
    var sql2 = "SELECT Pname, Plocation FROM PROJECT WHERE Pnumber = ?";
    console.log(req.params)
    var inserts2 = [req.params.project]
    mysql.pool.query(sql2, inserts2, function(error, results2, fields){
          if(error){
              res.write(JSON.stringify(error));
              res.end();
          }
          context.Pname = results2[0].Pname;
          context.Plocation = results2[0].Plocation;
          complete();
      });
  }

  /* Find people whose fname starts with a given string in the req */
  function getEmployeesWithNameLike(req, res, mysql, context, complete) {
    //sanitize the input as well as include the % character
     var query = "SELECT Fname, Lname, Salary, Dno FROM EMPLOYEE WHERE Fname Like" + mysql.pool.escape(req.params.s + '%');
    console.log(query)

    mysql.pool.query(query, function(error, results, fields){
          if(error){
              res.write(JSON.stringify(error));
              res.end();
          }
          context.employee = results;
          complete();
      });
  }

  /*Display all people. Requires web based javascript to delete users with AJAX*/

  router.get('/', function(req, res){
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["filteremployee.js","searchemployee.js"];
      var mysql = req.app.get('mysql');
      getEmployees(res, mysql, context, complete);
      getProjects(res, mysql, context, complete);
      function complete(){
          callbackCount++;
          if(callbackCount >= 2){
              res.render('employee', context);
          }

      }
  });

  /*Display all people from a given homeworld. Requires web based javascript to delete users with AJAX*/
  router.get('/filter/:project', function(req, res){
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["filteremployee.js","searchpeople.js"];
      var mysql = req.app.get('mysql');
      getEmployeebyProject(req,res, mysql, context, complete);
      getProjects(res, mysql, context, complete);
      function complete(){
          callbackCount++;
          if(callbackCount >= 2){
              res.render('employee', context);
          }

      }
  });

  /*Display all people whose name starts with a given string. Requires web based javascript to delete users with AJAX */
  router.get('/search/:s', function(req, res){
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["filterpeople.js","searchemployee.js"];
      var mysql = req.app.get('mysql');
      getEmployeesWithNameLike(req, res, mysql, context, complete);
      getProjects(res, mysql, context, complete);
      function complete(){
          callbackCount++;
          if(callbackCount >= 2){
              res.render('employee', context);
          }
      }
  });

  /* Display one person for the specific purpose of updating people */
/*
  router.get('/:id', function(req, res){
      callbackCount = 0;
      var context = {};
      context.jsscripts = ["selectedplanet.js", "updateperson.js"];
      var mysql = req.app.get('mysql');
      getPerson(res, mysql, context, req.params.id, complete);
      getPlanets(res, mysql, context, complete);
      function complete(){
          callbackCount++;
          if(callbackCount >= 2){
              res.render('update-person', context);
          }

      }
  });
*/
  /* Adds a person, redirects to the people page after adding */
/*
  router.post('/', function(req, res){
      console.log(req.body.homeworld)
      console.log(req.body)
      var mysql = req.app.get('mysql');
      var sql = "INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES (?,?,?,?)";
      var inserts = [req.body.fname, req.body.lname, req.body.homeworld, req.body.age];
      sql = mysql.pool.query(sql,inserts,function(error, results, fields){
          if(error){
              console.log(JSON.stringify(error))
              res.write(JSON.stringify(error));
              res.end();
          }else{
              res.redirect('/people');
          }
      });
  });
*/
  /* The URI that update data is sent to in order to update a person */
/*
  router.put('/:id', function(req, res){
      var mysql = req.app.get('mysql');
      console.log(req.body)
      console.log(req.params.id)
      var sql = "UPDATE bsg_people SET fname=?, lname=?, homeworld=?, age=? WHERE character_id=?";
      var inserts = [req.body.fname, req.body.lname, req.body.homeworld, req.body.age, req.params.id];
      sql = mysql.pool.query(sql,inserts,function(error, results, fields){
          if(error){
              console.log(error)
              res.write(JSON.stringify(error));
              res.end();
          }else{
              res.status(200);
              res.end();
          }
      });
  });
*/
  /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */
/*
  router.delete('/:id', function(req, res){
      var mysql = req.app.get('mysql');
      var sql = "DELETE FROM bsg_people WHERE character_id = ?";
      var inserts = [req.params.id];
      sql = mysql.pool.query(sql, inserts, function(error, results, fields){
          if(error){
              console.log(error)
              res.write(JSON.stringify(error));
              res.status(400);
              res.end();
          }else{
              res.status(202).end();
          }
      })
  })
*/
  return router;
}();
