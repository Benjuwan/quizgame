## QuizGame
### コンセプト
「誰でも満点（全問正解できる）」というコンセプトのクイズゲームです。常に全問正答して俺TUEEE（おれつえええ）という無双状態を体感し、自己肯定感を爆上げしてください。<br>
もちろん、一般的なクイズの仕様にすることもできます。下記[質問内容シート](#質問内容シート)で記載している`adjust`（※ヒントを提示して回答不可にするシグナル）の値を記述しなければ通常の回答として機能します。

## `build / deploy`時の調整箇所
- `vite.config.ts`<br>`base`のコメントアウトを解除する。
- `src/globalLibs/GlobalContext.tsx`<br>`isDeploy`を`true`に切り替える。

## 質問内容シート
- `public\jsons\quiz.json`
  - `quiz`：質問文
  - `imgsrc`：参照画像パス（※任意）
  - `choices`：回答選択肢（※デフォルトは 8個まで対応可。`one`, `two`など各回答オブジェクトはここでは省略）
    - `txt`：回答文
    - `point`：得点
    - `adjust`：調整（強制）文（※任意かつ複数キーワードの設定も可能）
- `public\jsons\answers`<br>
得点（`point`の総合算）に応じた結果表示データ。デフォルトでは`low`,`medium`,`high`の3種類を用意。

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
- vite@6.2.1"# quizgame" 
