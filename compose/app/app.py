from flask import Flask, request, render_template_string, redirect, url_for, make_response
import random
import secrets
import string

app = Flask(__name__)

# Хранение комментариев в памяти
comments = []

# Список случайных никнеймов из игр NES
nes_nicknames = [
    "Mario", "Luigi", "Link", "Zelda", "Samus", "DonkeyKong", "Pikachu", "Kirby", "Fox", "Ness",
    "CaptainFalcon", "Yoshi", "SegaMega Drive", "Peach", "Daisy", "Wario", "Waluigi", "PacMan", "Megaman", "Nintendo"
]

# Функция для генерации случайной строки
def generate_secret():
    alphabet = string.ascii_letters + string.digits  # Буквы и цифры
    return ''.join(secrets.choice(alphabet) for _ in range(16))  # Строка длиной 16 символов

@app.route('/', methods=['GET', 'POST'])
def index():
    # Получаем никнейм и секрет из куки или генерируем новые
    nickname = request.cookies.get('nickname')
    secret = request.cookies.get('secret')
    
    # Если куки отсутствуют, генерируем новые значения
    if not nickname or not secret:
        nickname = random.choice(nes_nicknames)
        secret = generate_secret()
    
    # Создаем ответ
    response = make_response(render_template_string('''
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Комментарии с геометрией</title>
            <link rel="stylesheet" href="{{ url_for('static', filename='styles.css') }}">
        </head>
        <body>
            <canvas id="canvas"></canvas>
            <script src="static/animation.js"></script>

            <div class="content">
                <h1>Оставьте комментарий</h1>
                <p>Ваш никнейм: {{ nickname }}</p>
                <p>Ваш секретный Cookie: {{ secret }}</p>
                <p>Текущая дата: <span id="currentDate"></span></p>
                <form method="POST" action="/comment">
                    <textarea name="comment"></textarea><br>
                    <input type="submit" value="Отправить">
                </form>
                <h2>Комментарии:</h2>
                {{ comments|safe }}
                <br><br>
                <form method="POST" action="/clear">
                    <input type="submit" value="Очистить комментарии">
                </form>
            </div>
            <script>
                // Функция для отображения текущей даты
                function showCurrentDate() {
                    const dateElement = document.getElementById('currentDate');
                    const now = new Date();
                    const options = { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric', 
                        hour: '2-digit', 
                        minute: '2-digit', 
                        second: '2-digit' 
                    };
                    dateElement.textContent = now.toLocaleDateString('ru-RU', options);
                }

                // Обновляем дату каждую секунду
                setInterval(showCurrentDate, 1000);
                showCurrentDate(); // Показываем дату сразу при загрузке страницы
            </script>
        </body>
        </html>
    ''', nickname=nickname, secret=secret, comments="<br>".join(comments)))
    
    # Устанавливаем куки, если они отсутствовали
    if not request.cookies.get('nickname') or not request.cookies.get('secret'):
        response.set_cookie('nickname', nickname)
        response.set_cookie('secret', secret)
    
    return response

@app.route('/comment', methods=['POST'])
def add_comment():
    # Получаем никнейм из куки
    nickname = request.cookies.get('nickname')
    if nickname:
        comment = request.form.get('comment')
        if comment:
            # Добавляем комментарий с указанием никнейма
            comments.append(f"<strong>{nickname}:</strong> {comment}")
    # Перенаправляем на главную страницу
    return redirect(url_for('index'))

@app.route('/clear', methods=['POST'])
def clear_comments():
    # Очищаем список комментариев
    comments.clear()
    # Перенаправляем на главную страницу
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)