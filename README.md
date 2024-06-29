# mongoDB のテスト

docker-compose ファイルを使用して、mongoDB を立ち上げ、nodejs でアクセスできるか試しました。

## 起動方法

`docker-compose up --build -d`

以降は docker デスクトップで制御可能

### mongoDB の接続

コマンドラインで mognoDB を操作したい場合は、`mognosh`でアクセス（ChatGPT だと`mongo`で紹介されてた）。

基本は js と書き方は同じ。

```shell
use mydatabase # DBを選択
db.{コレクション名}.find() # コレクションごとに取得の動作を実行
db.deleteMany({}) # コレクションを削除
```

- init.js がまだ正常に実行されていないため、もう一度試してみたい
