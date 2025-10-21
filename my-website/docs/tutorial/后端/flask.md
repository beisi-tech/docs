---
sidebar_label: "Flask"
sidebar_position: 2
---

# Flask 框架教程

Flask 是一个轻量级的 Python Web 框架，被称为"微框架"。它使用 Werkzeug WSGI 工具包和 Jinja2 模板引擎，提供了构建 Web 应用所需的核心功能，同时保持简单和灵活。
### Flask 的特点

- **轻量级**：核心功能简单，易于理解和学习
- **灵活性**：可以根据需要选择组件和扩展
- **可扩展性**：丰富的扩展生态系统
- **开发效率**：快速原型开发和迭代
- **学习曲线平缓**：适合初学者

## 快速开始

### 环境要求

- Python 3.6 或更高版本
- pip 包管理器

### 安装 Flask

```bash
pip install Flask
```

### 第一个 Flask 应用

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
```

运行应用：

```bash
python app.py
```

访问 `http://127.0.0.1:5000` 查看结果。

## 路由和视图

### 基本路由

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return '首页'

@app.route('/about')
def about():
    return '关于我们'

@app.route('/user/<username>')
def show_user(username):
    return f'用户: {username}'

@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'文章 ID: {post_id}'
```

### HTTP 方法

```python
from flask import request

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return '登录处理'
    else:
        return '登录页面'
```

### 路由参数

```python
@app.route('/user/<username>')
def show_user(username):
    return f'用户: {username}'

@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'文章 ID: {post_id}'

@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    return f'子路径: {subpath}'
```

## 模板系统

### Jinja2 模板

```python
from flask import render_template

@app.route('/hello/<name>')
def hello(name):
    return render_template('hello.html', name=name)
```

```html
<!-- templates/hello.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Hello</title>
</head>
<body>
    <h1>Hello, {{ name }}!</h1>
</body>
</html>
```

### 模板继承

```html
<!-- templates/base.html -->
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}{% endblock %}</title>
</head>
<body>
    <header>
        <h1>我的网站</h1>
    </header>
    <main>
        {% block content %}{% endblock %}
    </main>
    <footer>
        <p>&copy; 2024 我的网站</p>
    </footer>
</body>
</html>
```

```html
<!-- templates/index.html -->
{% extends "base.html" %}

{% block title %}首页{% endblock %}

{% block content %}
<h2>欢迎来到我的网站</h2>
<p>这是一个使用 Flask 构建的网站。</p>
{% endblock %}
```

### 模板控制结构

```html
<!-- 条件语句 -->
{% if user %}
    <p>欢迎, {{ user.name }}!</p>
{% else %}
    <p>请先登录</p>
{% endif %}

<!-- 循环 -->
<ul>
{% for item in items %}
    <li>{{ item.name }}</li>
{% endfor %}
</ul>

<!-- 过滤器 -->
<p>{{ name|upper }}</p>
<p>{{ date|strftime('%Y-%m-%d') }}</p>
```

## 请求处理

### 获取请求数据

```python
from flask import request

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    return f'用户名: {username}, 密码: {password}'

@app.route('/api/data')
def get_data():
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 10, type=int)
    return f'页码: {page}, 每页: {limit}'
```

### 文件上传

```python
from flask import request
from werkzeug.utils import secure_filename
import os

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return '没有文件'
    
    file = request.files['file']
    if file.filename == '':
        return '没有选择文件'
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return '文件上传成功'
```

## 响应处理

### 返回 JSON

```python
from flask import jsonify

@app.route('/api/users')
def get_users():
    users = [
        {'id': 1, 'name': '张三'},
        {'id': 2, 'name': '李四'}
    ]
    return jsonify(users)

@app.route('/api/user/<int:user_id>')
def get_user(user_id):
    user = {'id': user_id, 'name': f'用户{user_id}'}
    return jsonify(user)
```

### 重定向

```python
from flask import redirect, url_for

@app.route('/admin')
def admin():
    return redirect(url_for('login'))

@app.route('/old-page')
def old_page():
    return redirect('/new-page', code=301)
```

### 错误处理

```python
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500
```

## 会话和 Cookie

### 会话管理

```python
from flask import session, request

app.secret_key = 'your-secret-key'

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    session['username'] = username
    return '登录成功'

@app.route('/profile')
def profile():
    if 'username' in session:
        return f'欢迎, {session["username"]}'
    else:
        return '请先登录'

@app.route('/logout')
def logout():
    session.pop('username', None)
    return '已退出登录'
```

### Cookie 处理

```python
from flask import make_response

@app.route('/set-cookie')
def set_cookie():
    resp = make_response('Cookie 已设置')
    resp.set_cookie('username', 'john')
    return resp

@app.route('/get-cookie')
def get_cookie():
    username = request.cookies.get('username')
    return f'用户名: {username}'
```

## 数据库集成

### SQLAlchemy 集成

```bash
pip install Flask-SQLAlchemy
```

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

# 创建表
with app.app_context():
    db.create_all()

@app.route('/users')
def get_users():
    users = User.query.all()
    return render_template('users.html', users=users)
```

### 数据库操作

```python
# 创建用户
@app.route('/create-user', methods=['POST'])
def create_user():
    username = request.form['username']
    email = request.form['email']
    
    user = User(username=username, email=email)
    db.session.add(user)
    db.session.commit()
    
    return '用户创建成功'

# 查询用户
@app.route('/user/<int:user_id>')
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return f'用户: {user.username}'

# 更新用户
@app.route('/update-user/<int:user_id>', methods=['POST'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    user.username = request.form['username']
    user.email = request.form['email']
    db.session.commit()
    
    return '用户更新成功'

# 删除用户
@app.route('/delete-user/<int:user_id>')
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    
    return '用户删除成功'
```

## 表单处理

### Flask-WTF 集成

```bash
pip install Flask-WTF
```

```python
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email

class LoginForm(FlaskForm):
    username = StringField('用户名', validators=[DataRequired()])
    password = PasswordField('密码', validators=[DataRequired()])
    submit = SubmitField('登录')

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        # 处理登录逻辑
        return '登录成功'
    return render_template('login.html', form=form)
```

```html
<!-- templates/login.html -->
<form method="POST">
    {{ form.hidden_tag() }}
    <p>
        {{ form.username.label }}<br>
        {{ form.username() }}
    </p>
    <p>
        {{ form.password.label }}<br>
        {{ form.password() }}
    </p>
    <p>{{ form.submit() }}</p>
</form>
```

## 用户认证

### Flask-Login 集成

```bash
pip install Flask-Login
```

```python
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password_hash, password):
            login_user(user)
            return redirect(url_for('dashboard'))
    
    return render_template('login.html')

@app.route('/dashboard')
@login_required
def dashboard():
    return f'欢迎, {current_user.username}!'

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))
```

## API 开发

### RESTful API

```python
from flask import jsonify, request

@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': user.id,
        'username': user.username,
        'email': user.email
    } for user in users])

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = User(
        username=data['username'],
        email=data['email']
    )
    db.session.add(user)
    db.session.commit()
    
    return jsonify({
        'id': user.id,
        'username': user.username,
        'email': user.email
    }), 201

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    user.username = data['username']
    user.email = data['email']
    db.session.commit()
    
    return jsonify({
        'id': user.id,
        'username': user.username,
        'email': user.email
    })

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    
    return '', 204
```

### API 错误处理

```python
@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad Request'}), 400

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not Found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal Server Error'}), 500
```

## 测试

### 单元测试

```python
import unittest
from app import app, db, User

class TestApp(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_index(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)

    def test_create_user(self):
        response = self.app.post('/api/users', json={
            'username': 'testuser',
            'email': 'test@example.com'
        })
        self.assertEqual(response.status_code, 201)

if __name__ == '__main__':
    unittest.main()
```

## 部署

### 生产环境配置

```python
# config.py
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///app.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class ProductionConfig(Config):
    DEBUG = False

class DevelopmentConfig(Config):
    DEBUG = True
```

### 使用 Gunicorn 部署

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

### Docker 部署

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

## 最佳实践

1. **项目结构**：使用蓝图组织大型应用
2. **配置管理**：使用配置文件管理不同环境
3. **错误处理**：实现完善的错误处理机制
4. **安全性**：使用 CSRF 保护、输入验证
5. **性能优化**：使用缓存、数据库优化

## 学习资源

- [Flask 官方文档](https://flask.palletsprojects.com/)
- [Flask 中文文档](https://dormousehole.readthedocs.io/)
- [Flask 教程 - 菜鸟教程](https://www.runoob.com/flask/flask-tutorial.html)
- [Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)

## 常见问题

### Q: Flask 和 Django 有什么区别？
A: Flask 是微框架，更灵活但需要更多配置；Django 是全功能框架，开箱即用但学习曲线较陡。

### Q: 如何选择 Flask 扩展？
A: 选择官方推荐的扩展，查看文档和社区支持，避免使用过时的扩展。

### Q: 如何优化 Flask 应用性能？
A: 使用缓存、数据库连接池、异步处理、CDN 等技术来优化性能。
