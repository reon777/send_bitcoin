## 概要

JavaScript（ブラウザ）でビットコインを署名・送金するツール

## 事前準備

main.js の設定部分を変更する

```bash
npm install
# browserifyはブラウザでnpmモジュールを使うためのツール
npm install -g browserify
# npmモジュールをブラウザで使えるようにする
browserify main.js -o bundle.js
```

## 実行手順

ブラウザで index.js を表示する
コンソールに結果が表示される
