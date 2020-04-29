
$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
      let username = e.target.value;
  
      // Make request to Github
      $.ajax({
        url:'https://api.github.com/users/'+username,
        data:{
            client_id:'59005b46d813b6540e0d',
            client_secret:'90c6e79dfe554042d2e62aa3f42ec7c6abff7c05'
           
        }
      }).done(function(user){
        $.ajax({
          url:'https://api.github.com/users/'+username+'/repos',
          data:{
            client_id:'23b820abb52b876c824c',
            client_secret:'a28c51b364a8097627ca487a52948add0a213df1',
            sort: 'created: asc',
            per_page: 5
          }
        }).done(function(repos){
          $.each(repos, function(index, repo){
            $('#repos').append(`
              <div class="well">
                <div class="row">
                  <div class="col-md-7">
                    <strong>${repo.name}</strong>: ${repo.description}
                  </div>
                  <div class="col-md-3">
                    <span class="label label-default">Forks: ${repo.forks_count}</span>
                    <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                    <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                  </div>
                  <div class="col-md-2">
                    <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                  </div>
                </div>
              </div>
            `);
          });
        });
        $('#profile').html(`
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">${user.name}</h3>
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="col-md-3">
                  <img class="thumbnail avatar" src="${user.avatar_url}">
                  <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
                </div>
                <div class="col-md-9">
                <span class="label label-default">Public Repos: ${user.public_repos}</span>
                <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                <span class="label label-success">Followers: ${user.followers}</span>
                <span class="label label-info">Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                  <li class="list-group-item">Bio: ${user.bio}</li>
                  <li class="list-group-item">Email address:${user.email}</li>
                  <li class="list-group-item">Company: ${user.company}</li>
                  <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                  <li class="list-group-item">Location: ${user.location}</li>
                  <li class="list-group-item">Member Since: ${user.created_at}</li>
                  <li class="list-group-item">Last Updated at: ${user.updated_at}</li>
                  <a target="_blank" class="btn btn-primary btn-block" href="mailto:{user.email}">Mail</a>
                </ul>
                </div>
              </div>
            </div>
          </div>
          <h3 class="page-header">Latest Repos</h3>
          <div id="repos"></div>
        `);
      });
    });
  });