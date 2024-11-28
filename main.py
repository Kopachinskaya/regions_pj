from flask import Flask, render_template, request, redirect, url_for, jsonify, session, json
from flask_restful import Api, Resource 
import dashboard as dshb
import requests
import json


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
        template = render_template('page2.html', 
                                   page_name= 'Dashboard')
        
    return template

@app.route('/dashboard_api', methods = ['GET','POST'])
def get_data():
    values = request.get_json(cache=True)
    data = dshb.clean_data(values)
    dshb.rewrite_new_data_to_xlxs(data)
    response = jsonify({"response": values})
    return response


if __name__ == '__main__':
    app.run(debug=True)
