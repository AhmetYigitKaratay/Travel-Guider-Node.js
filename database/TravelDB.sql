create database traveldb;
use traveldb;


create table Budget(
budget_id int,
budget varchar(20),
PRIMARY KEY (budget_id)
);

create table Vtype(
type_id int,
vacation_type varchar(20),
PRIMARY KEY(type_id)
);

create table Season(
season_id int,
season varchar(20),
PRIMARY KEY(season_id)
);

create table Cities(
city_id int,
city_name varchar(20),
city_info varchar(255),
continent varchar(20),
visa_required int,
budget_id int,
type_id int,
season_id int,
PRIMARY KEY (city_id),
Foreign key(budget_id) References Budget(budget_id),
Foreign key(type_id) References Vtype (type_id),
Foreign key(season_id) References Season(season_id)
);


insert into Budget values(1,"2000-10000");
insert into Budget values(2,"10000-15000");
insert into Budget values(3,"15000-25000");
insert into Budget values(4,"25000-40000");

insert into Vtype values(1,"Romantic");
insert into Vtype values(2,"Urban");
insert into Vtype values(3,"Night Life");
insert into Vtype values(4,"Nature");
insert into Vtype values(5,"Beach");
insert into Vtype values(6,"Historic");

insert into Season values(1,"Jan-Mar");
insert into Season values(2,"Apr-Jun");
insert into Season values(3,"Jul-Sep");
insert into Season values(4,"Oct-Dec");

insert into Cities values(1,"Amsterdam","info about Amsterdam","Europe",1,1,3,3);
insert into Cities values(2,"Bangkok","info about Bangkok","Asia",0,3,2,2);
insert into Cities values(3,"Barcelona","info about Barcelona","Europe",1,1,1,2);
insert into Cities values(4,"Berlin","info about Berlin","Europe",1,1,3,3);
insert into Cities values(5,"Cape Town","info about Cape Town","Africa",0,3,4,1);
insert into Cities values(6,"Dubai","info about Dubai","Asia",1,2,5,1);
insert into Cities values(7,"Hong Kong","info about Hong Kong","Asia",0,4,2,3);
insert into Cities values(8,"Istanbul","info about Istanbul","Europe",0,1,6,2);
insert into Cities values(9,"Kahire","info about Kahire","Asia",0,2,6,1);
insert into Cities values(10,"London","info about London","Europe",1,1,2,3);
insert into Cities values(11,"Los Angeles","info about Los Angeles","North America",1,4,5,1);
insert into Cities values(12,"Miami","info about Miami","North America",1,4,5,1);
insert into Cities values(13,"Moscow","info about Moscow","Asia",1,2,3,3);
insert into Cities values(14,"New York","info about New York","North America",1,4,2,2);
insert into Cities values(15,"Paris","info about Paris","Europe",1,1,2,3);
insert into Cities values(16,"Rome","info about Rome","Europe",1,1,6,2);
insert into Cities values(17,"Sao Paulo","info about Sao Paulo","South America",0,3,4,4);
insert into Cities values(18,"Seul","info about Seul","Asia",0,3,2,3);
insert into Cities values(19,"Sydney","info about Sydney","Australia",1,4,2,4);
insert into Cities values(20,"Tokio","info about Tokio","Asia",0,4,2,3);


Select * from Cities
inner join Budget on Cities.budget_id= Budget.budget_id
inner join Vtype on Cities.type_id= Vtype.type_id
inner join Season on Cities.season_id= Season.season_id
order by city_id;

SELECT * FROM cities WHERE budget_id = 1;
