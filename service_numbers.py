import sqlite3
import random



def update_new_goal(deposits, type):
    conexao = sqlite3.connect('numbers.db')
    cursor = conexao.cursor()
    
    cursor.execute('SELECT id FROM numbers WHERE deposit = true')

    deposited_values = cursor.fetchall()
 
   

    cursor.execute('DELETE FROM numbers')
    

    for i in range (1, (deposits + 1), 1):
        cursor.execute(''' INSERT INTO numbers (id, deposit) 
                       VALUES (?,?)''', (i, False))
    
    if(type == 1):
        for value in deposited_values:
            update_deposit_internal(conexao, cursor, value[0], 'true')


    conexao.commit()

    
def update_deposit_internal(conexao, cursor, id, status):
   
    if(status == 'true'):
        status = True
    else:
        status = False

    cursor.execute('''UPDATE numbers 
                   SET deposit = ? 
                   WHERE id = ?''', (status, id))
    conexao.commit()


def update_deposit(id, status):

    conexao = sqlite3.connect('numbers.db')
    cursor = conexao.cursor()
   
    if(status == 'true'):
        status = True
    else:
        status = False

    cursor.execute('''UPDATE numbers 
                   SET deposit = ? 
                   WHERE id = ?''', (status, id))
    conexao.commit()

    conexao.close()

def update_deposit_serie(numbers):
    for n in numbers:
        update_deposit(n, 'true')




def deposit_filter(filter):
    conexao = sqlite3.connect('numbers.db')
    cursor = conexao.cursor()

    sql = '''SELECT id FROM numbers 
                   WHERE deposit = ''' + filter
    
    cursor.execute(sql)

    numbers = cursor.fetchall()


    conexao.close()

    return numbers

def table_numbers():
    conexao = sqlite3.connect('numbers.db')
    cursor = conexao.cursor()

    cursor.execute('SELECT * FROM numbers')

    numbers = cursor.fetchall()

    for number in numbers:
        print(number)

    conexao.close()

def sort_numbers(value):
    
    conexao = sqlite3.connect('numbers.db')
    cursor = conexao.cursor()


    sql = '''SELECT id FROM numbers 
                   WHERE deposit = false AND id <= ''' + str(value)
    
    cursor.execute(sql)

    numbers = cursor.fetchall()

   

    rest = value

    selected_values = []
    
    while(len(numbers) > 0):
        
        choice = random.choice(numbers)[0]

        print(choice)

        
        rest -= choice

        selected_values.append(choice)

        sql = '''SELECT id FROM numbers 
                   WHERE deposit = false AND id <= ''' + str(rest)
    
        
        for s in selected_values:
            sql += ''' AND id <> ''' + (str(s))

        cursor.execute(sql)

        numbers = cursor.fetchall()
     

    for s in selected_values:
        print(s)  

    return selected_values


def get_deposits():
    conexao = sqlite3.connect('numbers.db')
    cursor = conexao.cursor()

    sql = '''SELECT MAX(id) FROM numbers'''

    cursor.execute(sql)

    deposits = cursor.fetchall()

    return deposits[0]




