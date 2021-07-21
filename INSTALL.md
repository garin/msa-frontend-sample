# フロントエンドの初期設定

webpack + stimulus の初期設定を行う。

## 事前準備

### npm

**npm の初期化**

```
# npm init
```

**webpack, stimulus のインストール**

```
# vi package.json
{
  "scripts": {
    "build": "webpack"
  },
  "devDependencies": {
    "webpack": "^5.45.1",
    "stimulus": "^2.0.0"
  }
}
# npm install
```

node_modules にパッケージがインストールされる

### webpack, stimulus

**webpack-cli**

コマンドラインで webpack を実行する設定

```
// PATH の設定
# echo 'PATH="$PATH:${HOME}/.node_modules/bin"' >> ~/.zshrc ; rehash

// webpack-cli のインストール(コマンド名は webpack)
# npm install -g webpack-cli
```

**webpack の設定**

webpack.config.js にエントリポインとの JS を出力先の js を指定する

```
# vi webpack.config.js
module.exports = {
  entry: './src/application.js',
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/`,
    filename: 'dist/main.js'
  }
};
```

**application.js の作成**

エントリポイント src/application.js で stimulus を読み込む。
また、src/controllers に stimulus のコントローラファイルを設置する設定を追加。

```
# mkdir src src/controllers
# vi src/application.js
import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))
```

**ビルド**

src/application.js を元に生成したファイルを dist/main.js に出力。
※JS を書き換えるたびに実行する

```
# webpack --mode development
```

### Web サーバ

```
$ vi server.rb
require 'webrick'

op = { BindAddress:  "127.0.0.1", Port: 9999, DocumentRoot: "." }
s = WEBrick::HTTPServer.new(op)
s.start

$ ruby server.rb
```

http://localhost:9999

## Web サイトの作成

**HTML ファイル**

```
# vi index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Sample webpack/stimulus</title>
  </head>
  <body>
    <h1>My webpack Page</h1>
    <script src="dist/main.js"></script><!-- ビルドした mian.js を読み込む-->
  </body>

<!-- stimulus の hello_contoller を読み込む -->
<div data-controller="hello">
  <input type="text">
  <button>Greet</button>
</div>
</html>
```

**stimulus js ファイル**

hello_contoller を src/controllers の下に定義する
```
# vi src/controllers/hello_controller.js
import { Controller } from "stimulus"

export default class extends Controller {
//  connect() {
//    console.log("Hello, Stimulus!", this.element)
//  }
  greet() {
    console.log("Hello, Stimulus!", this.element)
  }
}
```

js を書き換えたので再ビルドする

```
$ webpack --mode development
```

http://localhost:9999/index.html にアクセスして JS(stimulus)が動作するかを確認
Greet ボタンを押すと JS コンソールに「Hello, Stimulus!」が表示される
