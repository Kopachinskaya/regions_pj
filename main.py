from flask import Flask, render_template, request, redirect, url_for, jsonify, session
import dashboard as dshb
import requests

app = Flask(__name__)
app.secret_key = 'your_secret_key'


@app.route('/', methods = ['GET', 'POST'])
def form():
    template = render_template('index.html', 
                           page_name= 'Index')
    return template

@app.route('/dashboard', methods = ['GET', 'POST'])
def dashboard():
    region =  request.values.get('regionSearchInput')
    session['region'] = region
    if request.method == 'POST':
        data = dshb.data_to_web(region)
        template = render_template('page1.html',
                                data = data, 
                                region = region,
                                page_name= 'Dashboard')
    else:
        template = render_template('page_placeholder.html', 
                                   page_name= 'Dashboard')
        
    return template

@app.route('/dashboard.json', methods = ['GET','POST'])
def get_data():
    region = session.get('region')
    values = request.get_json()
    print(values)
    return jsonify({"region":region, "response": values})

@app.route('/dashboard_to_save', methods = ['GET', 'POST'])
def to_save():
    region =  request.values.get('regionSearchInput')
    if request.method == 'POST':
        data = dshb.data_to_web(region)
        template = render_template('page2.html',
                                data = data, 
                                region = region,
                                page_name= 'Dashboard')
    else:
        template = render_template('page_placeholder.html', 
                                   page_name= 'Dashboard')
        
    return template

if __name__ == '__main__':
    app.run(debug=True)
