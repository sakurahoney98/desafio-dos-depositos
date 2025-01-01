import sqlite3

conexao = sqlite3.connect('goal.db')

cursor = conexao.cursor()


cursor.execute(''' 
CREATE TABLE IF NOT EXISTS goal (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               value FLOAT,
               deposits INTEGER
               
               
               )



''')

conexao.commit()


conexao.close()