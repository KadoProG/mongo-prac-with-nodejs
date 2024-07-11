# mongoDB のテスト

docker-compose ファイルを使用して、mongoDB を立ち上げ、nodejs でアクセスできるか試しました。

## 起動方法

```shell
cp .env.example .env
docker-compose up --build -d
```

以降は docker デスクトップで制御可能

### mongoDB の接続

コマンドラインで mognoDB を操作したい場合は、`mognosh`でアクセス（ChatGPT だと`mongo`で紹介されてた）。

基本は js と書き方は同じ。

```shell
use mydatabase # DBを選択
db.{コレクション名}.find() # コレクションごとに取得の動作を実行
db.deleteMany({}) # コレクションを削除
```

## コンテナについて

### backend → カラオケ取得 API の将来像を兼ねてる

- `GET` `/post` カラオケデータ一覧を取得
- `POST` `/dam-site` カラオケデータを DAM サイトから取得し DB に反映

### backend-3 → バックエンドを NestJS に

- `/scores` カラオケデータ一覧を取得（上記とは連動していないが、連動は可能）

その他 REST API 仕様に多分基づく
