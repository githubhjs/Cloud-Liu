from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

HOST = "https://dl.dropboxusercontent.com/u/260733006"

@app.route("/")
def index():
    return render_template("index.html", host=HOST)

if __name__ == "__main__":
    app.debug = True
    HOST = "http://localhost:5000"
    app.run()
