# macOS Superset

官网 Github 下载压缩包 （ Download ZIP ）

unzip incubator-superset-0.30.zip

cd incubator-superset-0.30
git init
git add .
git commit -m “feat: init”
git branch -M main
git remote add origin xxxxxxxx
git push -u origin main

pip3 list
pip3 install virtualenv -i http://mirrors.aliyun.com/pypi/simple --trusted-host mirrors.aliyun.com
pip3 list
virtualenv --version
cd ~
mkdir .virtualenvs
cd .virtualenvs
python3 -V
python3 -m venv .venv  (执行完后会自动安装 pip)
source ~/.virtualenvs/.venv/bin/activate （激活虚拟环境）
pip3 list
pip install --upgrade pip -i http://mirrors.aliyun.com/pypi/simple --trusted-host mirrors.aliyun.com
deactivate （退出虚拟环境）



source ~/.virtualenvs/.venv/bin/activate （激活虚拟环境）
pip install setuptools==45.2.0 pytest-runner==5.2 python-dotenv pymysql flask-cors -i http://mirrors.aliyun.com/pypi/simple --trusted-host mirrors.aliyun.com
pip install wheel -i http://mirrors.aliyun.com/pypi/simple --trusted-host mirrors.aliyun.com

cd incubator-superset-0.30
pip install -r requirements.txt -i http://mirrors.aliyun.com/pypi/simple --trusted-host mirrors.aliyun.com
（注：若某个依赖项卡住了，可在 requirements.txt 里相应依赖项前加个 # 注释，先成功下载其他依赖项，再单独下载被注释的依赖）
  (可找到相对应的 whl 直接下载)
（如：pip install pandas-0.23.2-cp37-cp37m-macosx_10_6_intel.macosx_10_9_intel.macosx_10_9_x86_64.macosx_10_10_intel.macosx_10_10_x86_64.whl）
  (注：python 3.7 下载 0.23.1 有问题，暂改为 0.23.2)（同步修改下 requirements.txt）


cd incubator-superset-0.30/superset/static
rm -rf assets
cp -r ../assets .
cd assets

yarn -d
yarn build

python setup.py install

fabmanager create-admin --app superset

cd superset/bin
python superset db upgrade
python superset init
python superset version

flask run -p 8088 --with-threads --reload --debugger

deactivate （退出虚拟环境）




cd superset/static
cp -r ../assets .
cd assets
yarn -d
yarn build

source ~/.virtualenvs/.venv/bin/activate （激活虚拟环境）
flask run -p 8088 --with-threads --reload --debugger
deactivate （退出虚拟环境）




pip install mysqlclient -i http://mirrors.aliyun.com/pypi/simple --trusted-host mirrors.aliyun.com  (虚拟环境需要先安装 mysql server)

可前往官网下载：https://dev.mysql.com/downloads/mysql/
安装后配置环境变量：
sudo vim /etc/profile
export PATH=$PATH:/usr/local/mysql/bin
source /etc/profile

(/Users/zhuhuajian/.virtualenvs/.venv//lib/python3.7/site-packages/superset-0.30.0rc13-py3.7.egg/superset/config.py)
incubator-superset-0.30/superset/config.py:
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root@localhost:3306/pab?charset=utf8'

mysql -u root -p  (mysql -h 主机名 -u 用户名 -p)
(create databases pab;)
show databases;
use pab;
show tables;

fabmanager create-admin --app superset
superset db upgrade
superset init
flask run -p 8088 --with-threads --reload --debugger
