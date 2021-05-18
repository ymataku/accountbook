# accountbook
## 概要
シンプルな家計簿アプリです。一日の支出を何に使ったかを同時に記録します。また一週間区切りや、一カ月区切りでの支出も同時に作成します。
## 特徴
記録したデータの合計を出すのはもちろんですが、そこから、
それぞれ何に使ったかのパーセンテージを出しグラフを作成します。
## 使い方
* npx sequelize-cli db:migrage --env development 
-ローカル環境でアプリを動かすためのデータベースを作成します。
* npm start 
-ローカル環境でアプリを動かすためのコマンドです。

# Requirement
* cookie-parser: "~1.4.4",
* debug: "~2.6.9",
* ejs: "~2.6.1",
* express: "~4.16.1",
* express-session: "^1.17.1",
* http-errors: "~1.6.3",
* morgan: "~1.9.1",
* nodeplotlib: "^0.7.3",
* pg: "^8.6.0",
* sequelize: "^6.6.2",
* sequelize-cli: "^6.2.0"
# Install
npm install -このコマンドでインストールします。
# Author
yamada takuya


