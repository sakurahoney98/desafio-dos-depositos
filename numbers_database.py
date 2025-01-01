import sqlite3

conexao = sqlite3.connect('numbers.db')

cursor = conexao.cursor()


cursor.execute(''' 
CREATE TABLE IF NOT EXISTS numbers (
               id INTEGER PRIMARY KEY,
               deposit BOOLEAN
               
               
               )



''')

conexao.commit()


conexao.close()