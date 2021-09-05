create table if not exists job_posts (
  id integer primary key autoincrement,
  title text not null,
  uri text unique not null,
  applicants integer not null
);

insert into job_posts (title, uri, applicants)
values ('python developer', 'localhost:5000/random1', 0),
       ('ui/ux designer', 'localhost:5000/random2', 0);
