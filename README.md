## QuizGame

- 公開サイト：[https://quizgame-benjuwan.vercel.app/](https://quizgame-benjuwan.vercel.app/)

<img width="1047" alt="Image" src="https://github.com/user-attachments/assets/e53ef7d4-a701-4f08-8045-fa6340b25c07" />

### コンセプト
「誰でも100点が取れる（全問正解できる）」というコンセプトのクイズゲームです。常に全問正答して俺TUEEE（おれつえええ）という無双状態を体感し、自己肯定感を爆上げしてください。

<img width="757" alt="Image" src="https://github.com/user-attachments/assets/a87b514c-8e55-493b-b717-64c28ef75e18" />

- 試用キャプチャ<br>
このように**間違った回答を選ぶと強制的に選択不可となり、回答が未チェックでは次の問題へは進めない**ため、必然的に**正答しか選べない**状況になるのです。

![Image](https://github.com/user-attachments/assets/68dac002-6503-40ae-85fe-3d3ea8227a65)

---

もちろん、一般的なクイズの仕様（回答強制が無いver）にすることもできます。下記[質問内容シート](#質問内容シート)で記載している`adjust`（※ヒントを提示して選択不可にする）を用意しなければ通常の処理（回答強制が無いver）として機能します。

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
    - `adjust`：回答強制キーワード（※任意かつ複数キーワードの設定も可能。各設問において一つも設定していない場合は一般的なクイズの仕様に変化する）

## 質問回答シート
- `public\jsons\answers`の各種`json`ファイル<br>
得点（`point`の総合算）に応じた結果表示データ。デフォルトでは`low`,`medium`,`high`の3種類を用意。

## 環境変数
- [環境変数 | 環境変数とモード](https://ja.vite.dev/guide/env-and-mode.html#env-variables)<br>
`vite`プロジェクトなので環境変数に`VITE_`を前置しています。
```bash
VITE_FETCH_URL = "http://localhost:5173/public"
```

## `build / deploy`時の調整箇所
### 環境変数を使用時
- `src/globalLibs/GlobalContext.tsx`
  - 【任意】`selectQuizDefaultValue`の初期値（クイズゲームの初期選択肢）を必要に応じて変更する

### 環境変数に対応していないホスティング先の場合
<details>
<summary>環境変数に対応していないホスティング先の場合の作業フローを確認</summary>

#### `vite.config.ts`
`base`のコメントアウトを解除する（※サブディレクト配下（サブドメイン）へのデプロイ時のみ必要）
```diff
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
+  base: '/subdomain/hoge',
})
```

#### `src/common/isDeploy.ts`
- `isDeploy`を`true`に切り替える
- 【任意】`selectQuizDefaultValue`の初期値（クイズゲームの初期選択肢）を必要に応じて変更する
- 【任意】`fetchUrlPath_forDeploy`のパス名を必要に応じて変更する
```diff
// クイズゲームの選択肢のデフォルト値
export const selectQuizDefaultValue: string = 'animal';

+ // デプロイ時は true に
+ export const isDeploy: boolean = false;

+ // クイズゲームのフェッチ用URLパス（※サブドメイン不要（ルート直下）の場合は /subdomain/hoge を削除）
+ export const fetchUrlPath_forDeploy: string = 'https://domain/subdomain/hoge/jsons'; // 末尾に jsons は必須
```

#### フェッチ方法の変更・調整
- `src/FetchDataAndLoading.tsx`
```diff
const dynamicFetchPathUrl: string = `${selectQuiz.length !== 0 ? selectQuiz : selectQuizDefaultValue}/quiz.json`;

+ const fetchPathUrl: string = isDeploy ? `${fetchUrlPath_forDeploy}/quiz/${dynamicFetchPathUrl}` : `${location.origin}/public/jsons/quiz/${dynamicFetchPathUrl}`;
- const fetchPathUrl: string = `${import.meta.env.VITE_FETCH_URL}/jsons/quiz/${dynamicFetchPathUrl}`;
```

- `src/FirstViewer.tsx`
```diff
// クイズゲームの選択肢シートのフェッチ処理
+ const fetchSelectQuizPathUrl: string = isDeploy ? `${fetchUrlPath_forDeploy}/select-quiz.json` : `${location.origin}/public/jsons/select-quiz.json`;
- const fetchSelectQuizPathUrl: string = `${import.meta.env.VITE_FETCH_URL}/jsons/select-quiz.json`;
```

- `src/hooks/_useFetchData.ts`（※任意：当該ファイルを使用してデータフェッチする場合）
```diff
try {
  const dynamicFetchPathUrl: string = `${selectQuiz.length !== 0 ? selectQuiz : selectQuizDefaultValue}/quiz.json`;

+  const fetchPathUrl: string = isDeploy ? `${fetchUrlPath_forDeploy}/${dynamicFetchPathUrl}` : `${location.origin}/public/jsons/quiz/${dynamicFetchPathUrl}`;
-  const fetchPathUrl: string = `${import.meta.env.VITE_FETCH_URL}/jsons/quiz/${dynamicFetchPathUrl}`;
```

</details>

## 技術構成
- @eslint/js@9.35.0
- @tailwindcss/vite@4.1.13
- @types/react-dom@19.1.9
- @types/react@19.1.13
- @vitejs/plugin-react@4.7.0
- eslint-plugin-react-hooks@5.2.0
- eslint-plugin-react-refresh@0.4.20
- eslint@9.35.0
- globals@15.15.0
- react-dom@19.1.1
- react@19.1.1
- tailwindcss@4.1.13
- typescript-eslint@8.44.0
- typescript@5.7.3
- vite@6.3.6
