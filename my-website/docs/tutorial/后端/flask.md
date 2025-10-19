---
sidebar_label: "Flask"
sidebar_position: 2
---

# Flask 教程

Flask 是一个轻量级的 Python Web 框架，以其简洁的设计和灵活性而闻名。它提供了构建 Web 应用所需的核心功能，同时保持简单和可扩展。

## 什么是 Flask？

Flask 是一个微框架，具有以下特点：

- **轻量级**：核心功能简洁，易于理解和学习
- **灵活性**：可以根据需要选择组件和扩展
- **可扩展**：通过扩展系统添加功能
- **开发友好**：内置开发服务器和调试工具
- **RESTful 支持**：轻松构建 API 服务

## 环境准备

### 安装 Flask

```bash
# 创建虚拟环境
python -m venv flask_env
source flask_env/bin/activate  # Linux/macOS
# 或 flask_env\Scripts\activate  # Windows

# 安装 Flask
pip install Flask

# 验证安装
python -c "import flask; print(flask.__version__)"
```

### 项目结构

```
my_flask_app/
├── app.py              # 主应用文件
├── templates/          # HTML 模板
│   ├── base.html
│   ├── index.html
│   └── user.html
├── static/             # 静态文件
│   ├── css/
│   ├── js/
│   └── images/
├── requirements.txt    # 依赖文件
└── config.py          # 配置文件
```

## 第一个 Flask 应用

### 基础应用

```python
# app.py
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return '<h1>Hello, Flask!</h1>'

@app.route('/about')
def about():
    return '<h1>About Page</h1>'

if __name__ == '__main__':
    app.run(debug=True)
```

运行应用：

```bash
python app.py
```

访问 `http://127.0.0.1:5000` 查看结果。

## 路由系统

### 基本路由

```python
from flask import Flask

app = Flask(__name__)

# 基本路由
@app.route('/')
def home():
    return 'Welcome to Flask!'

# 带参数的路由
@app.route('/user/<username>')
def show_user(username):
    return f'User: {username}'

# 指定参数类型
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post ID: {post_id}'

# 支持多种 HTTP 方法
@app.route('/api/data', methods=['GET', 'POST'])
def api_data():
    if request.method == 'POST':
        return 'Data received'
    return 'Data requested'
```

### 路由装饰器

```python
# 自定义路由装饰器
def admin_required(f):
    def decorated_function(*args, **kwargs):
        # 检查管理员权限
        if not current_user.is_admin:
            return 'Access denied', 403
        return f(*args, **kwargs)
    decorated_function.__name__ = f.__name__
    return decorated_function

@app.route('/admin')
@admin_required
def admin_panel():
    return 'Admin Panel'
```

## 请求处理

### 获取请求数据

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/users', methods=['POST'])
def create_user():
    # 获取 JSON 数据
    data = request.get_json()
    
    # 获取表单数据
    name = request.form.get('name')
    email = request.form.get('email')
    
    # 获取查询参数
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 10, type=int)
    
    # 获取文件
    if 'file' in request.files:
        file = request.files['file']
        file.save(f'uploads/{file.filename}')
    
    return jsonify({
        'message': 'User created',
        'data': data
    })

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    # 模拟用户数据
    user = {
        'id': user_id,
        'name': 'John Doe',
        'email': 'john@example.com'
    }
    return jsonify(user)
```

### 响应处理

```python
from flask import Flask, jsonify, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/json')
def json_response():
    return jsonify({
        'status': 'success',
        'data': {'message': 'Hello, World!'}
    })

@app.route('/template')
def template_response():
    return render_template('index.html', title='Home')

@app.route('/redirect')
def redirect_response():
    return redirect(url_for('index'))

@app.route('/error')
def error_response():
    return 'Error occurred', 400

@app.route('/custom')
def custom_response():
    from flask import make_response
    response = make_response('Custom response')
    response.headers['X-Custom-Header'] = 'Custom Value'
    return response
```

## 模板系统

### 基础模板

```html
<!-- templates/base.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}{% endblock %}</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
</head>
<body>
    <nav>
        <a href="{{ url_for('index') }}">首页</a>
        <a href="{{ url_for('about') }}">关于</a>
    </nav>
    
    <main>
        {% block content %}{% endblock %}
    </main>
    
    <footer>
        <p>&copy; 2024 My Flask App</p>
    </footer>
</body>
</html>
```

### 页面模板

```html
<!-- templates/index.html -->
{% extends "base.html" %}

{% block title %}首页{% endblock %}

{% block content %}
<div class="container">
    <h1>欢迎来到 Flask 应用</h1>
    <p>这是一个使用 Flask 构建的 Web 应用。</p>
    
    {% if users %}
        <h2>用户列表</h2>
        <ul>
            {% for user in users %}
                <li>{{ user.name }} - {{ user.email }}</li>
            {% endfor %}
        </ul>
    {% endif %}
</div>
{% endblock %}
```

### 模板继承和包含

```html
<!-- templates/components/header.html -->
<header>
    <h1>我的网站</h1>
    <nav>
        <a href="/">首页</a>
        <a href="/about">关于</a>
    </nav>
</header>

<!-- templates/index.html -->
{% extends "base.html" %}

{% block content %}
    {% include 'components/header.html' %}
    
    <div class="content">
        <h2>欢迎</h2>
        <p>这是首页内容。</p>
    </div>
{% endblock %}
```

## 数据库集成

### SQLAlchemy 配置

```python
# config.py
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///app.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
```

### 模型定义

```python
# models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    posts = db.relationship('Post', backref='author', lazy=True)
    
    def __repr__(self):
        return f'<User {self.username}>'

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    def __repr__(self):
        return f'<Post {self.title}>'
```

### 数据库操作

```python
# app.py
from flask import Flask, render_template, request, redirect, url_for, flash
from models import db, User, Post
from config import config

app = Flask(__name__)
app.config.from_object(config['development'])

db.init_app(app)

# 创建数据库表
with app.app_context():
    db.create_all()

@app.route('/users')
def list_users():
    users = User.query.all()
    return render_template('users.html', users=users)

@app.route('/users/new', methods=['GET', 'POST'])
def create_user():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        
        user = User(username=username, email=email)
        db.session.add(user)
        db.session.commit()
        
        flash('用户创建成功！')
        return redirect(url_for('list_users'))
    
    return render_template('create_user.html')

@app.route('/users/<int:user_id>')
def show_user(user_id):
    user = User.query.get_or_404(user_id)
    return render_template('user.html', user=user)

@app.route('/users/<int:user_id>/edit', methods=['GET', 'POST'])
def edit_user(user_id):
    user = User.query.get_or_404(user_id)
    
    if request.method == 'POST':
        user.username = request.form['username']
        user.email = request.form['email']
        db.session.commit()
        
        flash('用户信息更新成功！')
        return redirect(url_for('show_user', user_id=user.id))
    
    return render_template('edit_user.html', user=user)

@app.route('/users/<int:user_id>/delete', methods=['POST'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    
    flash('用户删除成功！')
    return redirect(url_for('list_users'))
```

## 表单处理

### Flask-WTF 配置

```python
# forms.py
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, SelectField
from wtforms.validators import DataRequired, Email, Length

class UserForm(FlaskForm):
    username = StringField('用户名', validators=[DataRequired(), Length(min=4, max=20)])
    email = StringField('邮箱', validators=[DataRequired(), Email()])
    role = SelectField('角色', choices=[('user', '普通用户'), ('admin', '管理员')])
    submit = SubmitField('提交')

class PostForm(FlaskForm):
    title = StringField('标题', validators=[DataRequired(), Length(max=100)])
    content = TextAreaField('内容', validators=[DataRequired()])
    submit = SubmitField('发布')
```

### 表单处理

```python
# app.py
from forms import UserForm, PostForm

@app.route('/users/new', methods=['GET', 'POST'])
def create_user():
    form = UserForm()
    
    if form.validate_on_submit():
        user = User(
            username=form.username.data,
            email=form.email.data
        )
        db.session.add(user)
        db.session.commit()
        
        flash('用户创建成功！')
        return redirect(url_for('list_users'))
    
    return render_template('create_user.html', form=form)

@app.route('/posts/new', methods=['GET', 'POST'])
def create_post():
    form = PostForm()
    
    if form.validate_on_submit():
        post = Post(
            title=form.title.data,
            content=form.content.data,
            user_id=1  # 假设当前用户ID为1
        )
        db.session.add(post)
        db.session.commit()
        
        flash('文章发布成功！')
        return redirect(url_for('list_posts'))
    
    return render_template('create_post.html', form=form)
```

## 用户认证

### 登录系统

```python
# auth.py
from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from werkzeug.security import check_password_hash, generate_password_hash
from models import db, User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        user = User.query.filter_by(username=username).first()
        
        if user and check_password_hash(user.password_hash, password):
            session['user_id'] = user.id
            session['username'] = user.username
            flash('登录成功！')
            return redirect(url_for('index'))
        else:
            flash('用户名或密码错误！')
    
    return render_template('login.html')

@auth_bp.route('/logout')
def logout():
    session.clear()
    flash('已退出登录！')
    return redirect(url_for('index'))

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        
        # 检查用户是否已存在
        if User.query.filter_by(username=username).first():
            flash('用户名已存在！')
            return render_template('register.html')
        
        if User.query.filter_by(email=email).first():
            flash('邮箱已被使用！')
            return render_template('register.html')
        
        # 创建新用户
        user = User(
            username=username,
            email=email,
            password_hash=generate_password_hash(password)
        )
        
        db.session.add(user)
        db.session.commit()
        
        flash('注册成功！请登录。')
        return redirect(url_for('auth.login'))
    
    return render_template('register.html')
```

### 装饰器保护路由

```python
# decorators.py
from functools import wraps
from flask import session, redirect, url_for, flash

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            flash('请先登录！')
            return redirect(url_for('auth.login'))
        return f(*args, **kwargs)
    return decorated_function

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            flash('请先登录！')
            return redirect(url_for('auth.login'))
        
        user = User.query.get(session['user_id'])
        if not user or not user.is_admin:
            flash('需要管理员权限！')
            return redirect(url_for('index'))
        
        return f(*args, **kwargs)
    return decorated_function
```

## API 开发

### RESTful API

```python
# api.py
from flask import Blueprint, jsonify, request
from models import db, User, Post
from functools import wraps
import json

api_bp = Blueprint('api', __name__, url_prefix='/api')

def require_api_key(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        api_key = request.headers.get('X-API-Key')
        if api_key != 'your-secret-api-key':
            return jsonify({'error': 'Invalid API key'}), 401
        return f(*args, **kwargs)
    return decorated_function

@api_bp.route('/users', methods=['GET'])
@require_api_key
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'created_at': user.created_at.isoformat()
    } for user in users])

@api_bp.route('/users/<int:user_id>', methods=['GET'])
@require_api_key
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'created_at': user.created_at.isoformat()
    })

@api_bp.route('/users', methods=['POST'])
@require_api_key
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

@api_bp.route('/users/<int:user_id>', methods=['PUT'])
@require_api_key
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    
    db.session.commit()
    
    return jsonify({
        'id': user.id,
        'username': user.username,
        'email': user.email
    })

@api_bp.route('/users/<int:user_id>', methods=['DELETE'])
@require_api_key
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({'message': 'User deleted'}), 200
```

## 错误处理

### 自定义错误页面

```python
# app.py
from flask import render_template

@app.errorhandler(404)
def not_found_error(error):
    return render_template('errors/404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('errors/500.html'), 500

@app.errorhandler(403)
def forbidden_error(error):
    return render_template('errors/403.html'), 403
```

### 错误页面模板

```html
<!-- templates/errors/404.html -->
{% extends "base.html" %}

{% block title %}页面未找到{% endblock %}

{% block content %}
<div class="error-container">
    <h1>404 - 页面未找到</h1>
    <p>抱歉，您访问的页面不存在。</p>
    <a href="{{ url_for('index') }}" class="btn">返回首页</a>
</div>
{% endblock %}
```

## 部署

### 生产环境配置

```python
# config.py
import os

class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SECRET_KEY = os.environ.get('SECRET_KEY')
```

### Docker 部署

```dockerfile
# Dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
    depends_on:
      - db

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 部署到云平台

```bash
# 使用 Heroku
heroku create my-flask-app
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main

# 使用 AWS Elastic Beanstalk
eb init
eb create production
eb deploy
```

## 最佳实践

1. **项目结构**：合理组织代码结构
2. **配置管理**：使用环境变量管理配置
3. **错误处理**：完善的错误处理机制
4. **安全性**：输入验证、CSRF 保护、密码加密
5. **性能优化**：数据库查询优化、缓存使用
6. **测试**：编写单元测试和集成测试

## 学习资源

- [Flask 官方文档](https://flask.palletsprojects.com/)
- [Flask 中文文档](https://dormousehole.readthedocs.io/)
- [Flask 教程](https://flask.palletsprojects.com/tutorial/)
- [Flask 示例](https://github.com/pallets/flask/tree/main/examples)

## 常见问题

### Q: 如何选择 Flask 扩展？
A: 根据项目需求选择，常用的有 Flask-SQLAlchemy、Flask-WTF、Flask-Login 等。

### Q: 如何优化 Flask 应用性能？
A: 使用 Gunicorn 等 WSGI 服务器、启用缓存、优化数据库查询。

### Q: 如何处理 Flask 应用的安全性？
A: 使用 HTTPS、验证输入、防止 SQL 注入、设置安全的会话配置。
