from flask import Flask, render_template, request, jsonify, redirect, flash, url_for, session, escape
import json
import hashlib
from flask_mysqldb import MySQL
from hashlib import md5, sha256
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = 'R@OT01'
app.config['MYSQL_DB'] = 'maryaldb'

mysql = MySQL(app)

app.secret_key = 'mysecret_key'
class ServerError(Exception):pass

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
     if 'email' in session:
        username_session = escape(session['email']).capitalize()
        return render_template('user_session.html', session_user_name=username_session)
     else:
        # username_session = escape(session['email']).capitalize()
        # return render_template('pedidos.html', session_user_name=username_session)   
        return render_template('pedidos.html')   
     return redirect(url_for('login'))


@app.route('/dashuser')
def dashuser():
    if 'email' in session:
        username_session = escape(session['email']).capitalize()
        return render_template('user_session.html', session_user_name=username_session)
    # return redirect(url_for('login'))


     #return render_template('pedidos.html')

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

          #hash_pwd = generate_password_hash(pwd, method='sha256')
          hash_pwd = hashlib.sha256(pwd.encode()).hexdigest()
          print(hash_pwd)

          cur = mysql.connection.cursor()
          cur.execute('INSERT INTO `datos_usuario`(`id_cliente`, `id_tipdoc`, `nombres`, `apellidos`, `direccion`, `id_localidad`, `barrio`, `id_municipio`, `id_departamento`, `telefono`, `email`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', (numdoc, tipdoc, name, surname, address, boglocation, district, colmun, coldept, phone, email))
          mysql.connection.commit()
          cur.execute('INSERT INTO usuarios (id_cliente, login, password, fecha_creacion, fecha_cambio_pwd, estado) VALUES (%s, %s, %s, now(), NULL, 1)', (numdoc, email, hash_pwd))
          mysql.connection.commit()
        
     flash('Usuario registrado satisfactoriamente!')
  
     return redirect(url_for('store'))
               # return render_template('confirmar_registro.html')



@app.errorhandler(404)
def page_not_found(error):
    return render_template('error404.html'), 404


@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'email' in session:
        return redirect(url_for('dashuser'))

    error = None
    try:
        if request.method == 'POST':
            username_form = request.form['email']
            value = (str(username_form))
            # print(value)
            cur = mysql.connection.cursor()
            #cur.execute("SELECT COUNT(1) FROM usuarios WHERE login = {};".format(value))
            cur.execute("SELECT COUNT(1) FROM usuarios WHERE estado = 1 and login = %s;", [value])  # CHECKS IF USERNAME EXSIST
            test1 = cur.fetchone()
            print(test1)

               
            for row1 in test1:
                 # print(row1[0],)
                 # print(row1.get(0))
                  val = int(row1)
                  print(val)
                  if val == 1: 
                       print('hay usuario')
                       password_form = request.form['pwd']
                       hash_pwd = hashlib.sha256(password_form.encode()).hexdigest()
                       # hash_pwd = generate_password_hash(password_form, method='sha256')
                       # value2 = (str(hash_pwd))
                       cur.execute("SELECT password FROM usuarios WHERE login = %s;", [value])  # FETCH THE HASHED PASSWORD
                       test2 = cur.fetchone()
                         
                       for row2 in test2:
                            val2 = str(row2)
                            print(hash_pwd)
                            print(val2)
                                 
                            if hash_pwd == val2:
                                   print('coinciden')
                                   cur.execute("SELECT concat(du.nombres,' ', du.apellidos) FROM usuarios u, datos_usuario du WHERE (u.id_cliente = du.id_cliente) and u.login = %s;", [value])
                                   test3 = cur.fetchone()
                                   for row3 in test3:
                                        val3 = str(row3)          
                                     
                                   session['email'] = val3
                                   return redirect(url_for('dashuser'))
                            else:
                                   print('no coinciden')
                                   raise ServerError('Password invalido!')
                  else:
                       raise ServerError('Usuario no existe!')
                       
    except ServerError as e:
        error = str(e)

    return render_template('pedidos.html', error=error)
    

@app.route('/logout')
def logout():
    session.pop('email', None)
    return redirect(url_for('store'))


if __name__ == '__main__':
    app.run(debug=True)
    # cuando este en modo de prueba colocar True




