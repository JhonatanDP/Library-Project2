INSERT INTO author_table (first_name, last_name)
VALUES
 ('Valerio','De Santis'),
 ('Rob','Percival'),
 ('William','Lyon'),
 ('Aristeidis','Bampakos'),
 ('Code','Quickly'),
 ('Mario','Casciaro'),
 ('Craig','Buckler'),
 ('Evan','Hahn'),
 ('Walter','Shileds'),
 ('Vinicius','M. Grippa');

INSERT INTO location_table (isle, row_letter)
VALUES
  (2,'B'),
  (2, 'C'),
  (1,'D'),
  (5,'A'),
  (3, 'M'),
  (4,'V'),
  (9,'C'),
  (8, 'A'),
  (6,'B'),
  (7,'G');

INSERT INTO books_table (title, code, author_id, location_id)
VALUES
  ('ASP.NET Core 6 and Angular', 1803239700, 1, 2),
  ('JavaScript from Beginner to Professional', 1800562527, 2, 4),
  ('Full Stack GraphQL Applications', 1617297038, 3, 3),
  ('Angular Projects', 1800205260, 4, 2),
  ('Learn JavaScript Quickly', 1951791479, 5, 8),
  ('Node.js Design Patterns', 1839214112, 6, 5),
  ('Node.js: Novice to Ninja', 1925836525, 7, 9),
  ('Express in Action', 1617292427, 8, 6),
  ('SQL QuickStart Guide', 1945051752, 9, 1),
  ('Learning MySQL', 1492085928, 10, 7);
