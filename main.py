from flask import Flask, render_template, request, redirect, url_for
import dashboard as dshb
from collections import defaultdict

app = Flask(__name__)
app.secret_key = 'your_secret_key'


@app.route('/', methods = ['GET', 'POST'])
def form():
    template = render_template('index.html', 
                           page_name= 'Index')
    return template

@app.route('/dashboard', methods = ['GET', 'POST'])
def dashboard():
    if request.method == 'POST':
        region =  request.form.get('regionSearchInput')
        place_plan = request.values.get('places_plan')
        place_fact = request.values.get('places_fact')
        data = dshb.data_to_web(region)
        template = render_template('page1.html',
                                data = data, 
                                region = region, 
                                page_name= 'Dashboard')
    else:
        template = render_template('page_placeholder.html', 
                                   page_name= 'Dashboard')
        if request.method == 'POST':
            return redirect(url_for('dashboard'))
        
    return template
if __name__ == '__main__':
    app.run(debug=True)
