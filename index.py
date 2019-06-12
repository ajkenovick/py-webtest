from flask import Flask, render_template, request, jsonify, redirect, flash, url_for
import json
from flask_mysqldb import MySQL
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = 'R@OT01'
app.config['MYSQL_DB'] = 'maryaldb'

mysql = MySQL(app)

app.secret_key = 'mysecret_key'

@app.route('/')
def home():
    # return "Mi pagina principal Maryal"
    return render_template('index.html')

@app.route('/acercade')
def about():
    # return "Acerca de Maryal"
     return render_template('acercade.html')

@app.route('/objetivos')
def objectives():
    # return "Acerca de Maryal"
     return render_template('objetivos.html')

@app.route('/productos')
def products():
    # return "Productos de Maryal"
     return render_template('productos.html')

@app.route('/yogur_artesanal')
def yogur():
    # return "Yogur artesanal Maryal"
     return render_template('yogur_artesanal.html')

@app.route('/bolis_artesanal')
def frozzen():
    # return "Bolis artesanal Maryal"
     return render_template('bolis_artesanal.html')

@app.route('/pedidos')
def store():
    # return "Pedidos de Maryal"
     return render_template('pedidos.html')

@app.route('/nuevo_registro')
def new_register():

     # print(munic_d)
     cur = mysql.connection.cursor()
     cur.execute('Select * from tipo_documento')
     tip_doc_d = cur.fetchall()
     
     cur.execute('Select * from departamentos')
     depts_d = cur.fetchall()

     cur.execute('SELECT * FROM municipios')
     munic_d = cur.fetchall()

     cur.execute('Select * from localidades')
     local_d = cur.fetchall()

     return render_template('nuevo_registro.html', tdocdatas = tip_doc_d, deptdatas = depts_d, mundatas = munic_d, locdatas = local_d)
     
    



    
@app.route('/new_user', methods=['POST'])
def new_user():
    # return "Pedidos de Maryal"
     if request.method == 'POST':
          email = request.form['email']
          pwd = request.form['pwd2']
          name = request.form['name']
          surname = request.form['surname']
          tipdoc = request.form['seltipdoc']
          numdoc = request.form['numdoc']
          address = request.form['address']
          coldept = request.form['coldept']
          colmun = request.form['colmun']
          district = request.form['district']
          boglocation = request.form['boglocation']
          phone = request.form['phone']
          print(email)
          print(pwd)
          print(name)
          print(surname)
          print(tipdoc)
          print(numdoc)
          print(address)
          print(coldept)
          print(colmun)
          print(district)
          print(boglocation)
          print(phone) 

          hash_pwd = generate_password_hash(pwd, method='sha256')

          cur = mysql.connection.cursor()
          cur.execute('INSERT INTO `datos_usuario`(`id_cliente`, `id_tipdoc`, `nombres`, `apellidos`, `direccion`, `id_localidad`, `barrio`, `id_municipio`, `id_departamento`, `telefono`, `email`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', (numdoc, tipdoc, name, surname, address, boglocation, district, colmun, coldept, phone, email))
          mysql.connection.commit()
          cur.execute('INSERT INTO usuarios (id_cliente, login, password, fecha_creacion, fecha_cambio_pwd, estado) VALUES (%s, %s, %s, now(), NULL, 1)', (numdoc, email, hash_pwd))
          mysql.connection.commit()
        
     flash('Usuario registrado satisfactoriamente!')
  
     return redirect(url_for('store'))
               # return render_template('confirmar_registro.html')

@app.route('/login', methods=['POST'])
def login():
    # return "Pedidos de Maryal"
     if request.method == 'POST':
         # email = request.form['email']
          # select = request.get_data('email')
         # value = email.decode()
          # value2 = (str(value))
          pwd = request.form['pwd']

          hash_pwd = generate_password_hash(pwd, method='sha256')
          value2 = (str(hash_pwd))
          # print(email)
          print(value2)

          cur = mysql.connection.cursor()
          # cur.execute('Select * from usuarios where ')
          # cur.execute("SELECT id_cliente FROM usuarios where login = '{0}' and password = '{1}'".format(email, pwd))
          # cur.execute("SELECT id_cliente FROM usuarios where login = '{0}'".format(email))
          # cur.execute("SELECT id_cliente FROM usuarios where password = '{0}'".format(value2))
          cur.execute('SELECT id_cliente FROM usuarios where password = %s', (value2))
          test = cur.fetchall()
          print(test)

          return 'Exito'

@app.errorhandler(404)
def page_not_found(error):
    return render_template('error404.html'), 404

if __name__ == '__main__':
    app.run(debug=True)
    # cuando este en modo de prueba colocar True


