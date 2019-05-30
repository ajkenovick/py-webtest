from flask import Flask, render_template

app = Flask(__name__)

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

@app.errorhandler(404)
def page_not_found(error):
    return render_template('error404.html'), 404

if __name__ == '__main__':
    app.run(debug=True)
    # cuando este en modo de prueba colocar True


