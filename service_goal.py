import sqlite3






def updtade_goal(new_value, new_deposits):
    conexao = sqlite3.connect('goal.db')
    cursor = conexao.cursor()
    

    cursor.execute('''UPDATE goal 
               SET value = ?, deposits = ? 
               WHERE id = 1''', (new_value, new_deposits))

    conexao.commit()

    conexao.close()

def get_goal():
    conexao = sqlite3.connect('goal.db')
    cursor = conexao.cursor()

    
    cursor.execute('''SELECT * FROM goal  
               WHERE id = 1''')

    data = cursor.fetchall()

    conexao.close()

    return data




