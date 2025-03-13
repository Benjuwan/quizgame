## QuizGame

- 公開サイト：[https://quizgame-benjuwan.vercel.app/](https://quizgame-benjuwan.vercel.app/)

<img width="1047" alt="Image" src="https://github.com/user-attachments/assets/e53ef7d4-a701-4f08-8045-fa6340b25c07" />

### コンセプト
「誰でも100点が取れる（全問正解できる）」というコンセプトのクイズゲームです。常に全問正答して俺TUEEE（おれつえええ）という無双状態を体感し、自己肯定感を爆上げしてください。<br>
もちろん、一般的なクイズの仕様（回答強制が無いver）にすることもできます。下記[質問内容シート](#質問内容シート)で記載している`adjust`（※ヒントを提示して選択不可にする）を用意しなければ通常の処理（回答強制が無いver）として機能します。

<img width="757" alt="Image" src="https://github.com/user-attachments/assets/a87b514c-8e55-493b-b717-64c28ef75e18" />

- 用途
  - 脳トレ（認知症の予防とか）<br>間違った回答を選択した時点でヒントが表示されるので**振り返り + 脳への刺激になる**（かも？）
  - 学習の振り返り<br>**語句や専門用語、構文などのチェックといった学習面**のほか、**定型的な業務フローの確認（新人教育）など業務面**といった振り返りに活用できる（かも？）
  - 子どもの知育<br>表示された画像を含めて**楽しく学べる**（かも？）
  - `adjust`（※回答強制機能）を用意しないことで一般的なクイズとして活用

## クイズゲームの選択肢シート
- `public/jsons/select-quiz.json`<br>
各種`value`は「質問内容シート（`public\jsons\quiz`）」と「質問回答シート（`public\jsons\answers`）」配下の各ディレクトリ（フォルダ）名と一致させること

## 質問内容シート
- `public\jsons\quiz`の各種`quiz.json`ファイル
  - `quiz`：質問文
  - `imgsrc`：参照画像パス（※任意）
  - `choices`：回答選択肢（※デフォルトは 8個まで対応可。`one`, `two`など各回答オブジェクトはここでは省略）
    - `txt`：回答文
    - `point`：得点
    - `adjust`：調整（強制）文（※任意かつ複数キーワードの設定も可能）

## 質問回答シート
- `public\jsons\answers`の各種`json`ファイル<br>
得点（`point`の総合算）に応じた結果表示データ。デフォルトでは`low`,`medium`,`high`の3種類を用意。

## 環境変数
```bash
# vite プロジェクトなので VITE_ を前置する
VITE_FETCH_URL = "http://localhost:5173/public/jsons"
# 本環境ではサイトURL（https://quizgame-benjuwan.vercel.app）を指定
```
- [環境変数 | 環境変数とモード](https://ja.vite.dev/guide/env-and-mode.html#env-variables)

## `build / deploy`時の調整箇所
- `src/globalLibs/GlobalContext.tsx`
  - `selectQuizDefaultValue`の初期値（クイズゲームの初期選択肢）を必要に応じて変更する

## 技術構成
- @eslint/js@9.22.0
- @types/react-dom@19.0.4
- @types/react@19.0.10
- @vitejs/plugin-react@4.3.4
- eslint-plugin-react-hooks@5.2.0
- eslint-plugin-react-refresh@0.4.19
- eslint@9.22.0
- globals@15.15.0
- react-dom@19.0.0
- react@19.0.0
- styled-components@6.1.15
- typescript-eslint@8.26.0
- typescript@5.7.3
- vite@6.2.1
