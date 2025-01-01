from flask import Flask, request, render_template, jsonify
from waitress import serve
from service_numbers import sort_numbers, update_new_goal, update_deposit, update_deposit_serie, deposit_filter
from service_goal import updtade_goal, get_goal
import json



app = Flask(__name__)




@app.route('/')
def home():
    return render_template('index.html')



@app.route('/sort', methods=['POST'])
def sort():

   value = int(request.form.get('value-real'))
   print(value)
   sorted_numbers = sort_numbers(value)


   return jsonify({'sorted_numbers': sorted_numbers})

@app.route('/alter', methods=['POST'])
def alter():
   
   deposits = int(request.form.get('deposits'))
   value = float(request.form.get('value'))
   type = int(request.form.get('type'))

   
   updtade_goal(value, deposits)
   update_new_goal(deposits, type)

   return render_template('index.html') 

@app.route('/deposited', methods=['POST'])
def deposited():
   number = request.form.get('number')
   status = request.form.get('status')

   update_deposit(number, status)

   return render_template('index.html') 
   
@app.route('/goal', methods=['POST'])
def deposits():
   
   deposits_value = get_goal()
   deposits_value.append(len(deposit_filter('true')))
   
   return jsonify({'deposits_value': deposits_value}) 


@app.route('/atualized', methods=['POST'])
def atualized():
   
   deposited_numbers = deposit_filter('true')
   
   return jsonify({'deposited_numbers': deposited_numbers}) 

@app.route('/serie', methods=['POST'])
def deposited_serie():
   
  numbers = request.form.get('numbers')
  numbers = json.loads(numbers) 

  update_deposit_serie(numbers)
   
  return render_template('index.html') 

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=1000, threads=2)
