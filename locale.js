/* UI language only: never written into cloud saves. */
(function(root){'use strict';
const en={'ランク進行':'Rank progress',
'ゲームを読み込んでいます…':'Loading game…','もう一度読み込む':'Try again',
'クラシック':'Classic','◈ デイリー':'◈ Daily','ゲームモード':'Game mode','スコア':'Score',
'8×8のゲーム盤面':'8 by 8 game board','手持ちのブロック':'Available blocks',
'自由に、あなたのペースで。':'Relax. Play at your own pace.',' · UTC 共通チャレンジ':' · Shared UTC challenge',
'ブロックを選んで、盤面に置こう。':'Choose a block, then place it on the board.',
'今日の同じブロック列に挑戦。何度でも遊べます。':'Try today’s shared block sequence. Replay as often as you like.',
'ライン':'Lines','コンボ':'Combo','配置':'Moves',
'↻ 最初から':'↻ Restart','Ⅱ 一時停止':'Ⅱ Pause','♪ 効果音を試す':'♪ Test sound','? 遊び方':'? How to play',
'選んでタップ ／ ドラッグで配置':'Select and tap / Drag to place',
'時間制限なし。ラインをつないで、自分のベストへ。':'No time limit. Clear lines and beat your best.',
'戻る':'Back','▶ 再開する':'▶ Resume','YouTubeの再開を待っています':'Waiting for YouTube to resume',
'再開しました。次の一手をどうぞ。':'Resumed. Make your next move.',
'サウンド OFF。オンにする':'Sound OFF. Turn on','サウンド ON。オフにする':'Sound ON. Turn off',
'効果音を試すボタンをタップしてください。iPhoneの消音モードと音量も確認できます。':'Tap Test sound. Also check your iPhone’s silent mode and volume.',
'ここには置けません。空いている場所を選ぼう。':'That block does not fit here. Choose an empty space.',
'いい配置！ 次のブロックを置こう。':'Nice placement! Choose your next block.',
'盤面をタップ。形の左上が配置の基準です。':'Tap the board. The shape’s top-left corner is the anchor.',
'配置をキャンセルしました。もう一度動かせます。':'Placement cancelled. You can move the block again.',
'保存に失敗しました。次の操作で再試行します。':'Could not save. We will retry on your next move.',
'置けるブロックがなくなりました。':'No remaining blocks can fit on the board.',
'もう一度プレイ':'Play again','最初から始めますか？':'Start a new game?',
'現在の盤面はリセットされます。ベストスコアは残ります。':'Your board will reset. Your best score will be kept.',
'始める':'Start','YouTube側のミュートを解除してください。':'Unmute audio in YouTube.',
'確認音を再生しました。聞こえない場合はiPhoneの消音モードを解除し、音量を上げてください。':'Test sound played. If you cannot hear it, turn off silent mode and turn up your iPhone’s volume.',
'つなげて、消そう。':'Connect and clear.',
'3個のブロックから選んで、8×8の盤面をタップ。ドラッグも使えます。形の左上を基準に配置し、回転はありません。縦・横8マスを揃えると消去。連続の手で消すとコンボ！ 3個すべて使うと補充され、残る形がどこにも置けなくなると終了です。得点は1マス10点＋消去1マス15点＋コンボ数×50点。キーボードは1〜3で選択、盤面にTabで移動し、矢印とEnterで配置。デイリーはUTC日付で更新されます。':'Choose one of three blocks, then tap the 8×8 board or drag the block into place. The top-left of the shape is its anchor. Blocks cannot rotate. Fill a row or column to clear it. Clear on consecutive moves to build a combo! Use all three blocks to refill your hand. The game ends when none of the remaining shapes fit. Score: 10 per placed cell + 15 per cleared cell + combo × 50. Keyboard: 1–3 to select, Tab to the board, arrow keys to move, Enter to place. Daily challenges refresh at midnight UTC.',
'遊ぶ':'Play',
'保存データを読み込めませんでした。データを上書きせず停止しています。通信を確認して再試行してください。':'Could not load your save. Your data has not been overwritten. Check your connection and try again.',
'cell':'Row {row}, column {col}, {value}','occupied':'occupied','empty':'empty',
'piece':'Block {i}, {n} cells{used}','used':' (used)',
'cleared':'{n} lines cleared! Combo {combo}',
'multi':'{n} LINES AT ONCE!',
'summary':'{n} lines cleared · Best combo {combo}{daily}',
'dailySuffix':' / Replays on the same UTC day use the same block sequence.'
};
const ja={cell:'{row}行{col}列、{value}',occupied:'ブロックあり',empty:'空き',piece:'ブロック{i}、{n}マス{used}',used:'、使用済み',cleared:'{n}ライン消去！ コンボ {combo}',multi:'{n}ライン同時消し！',summary:'{n} ライン消去 · 最大コンボ {combo}{daily}',dailySuffix:' ／ 同じ日の再挑戦は同じブロック列です。'};
let language='ja';const textSources=new WeakMap(),attrSources=new WeakMap();
function normalize(tag){return typeof tag==='string'&&/^ja(?:-|$)/i.test(tag)?'ja':'en';}
function set(tag){language=normalize(tag);return language;}
function t(key,args={}){const value=(language==='en'?en[key]:ja[key])??key;return value.replace(/\{(\w+)\}/g,(_,name)=>String(args[name]??''));}
async function init({sdk,timeout=3000}={}){if(!sdk?.IN_PLAYABLES_ENV){language=normalize(typeof location!=='undefined'?(new URLSearchParams(location.search).get('lang')||navigator.language):'ja');return language;}let timer;try{const tag=await Promise.race([sdk.system.getLanguage(),new Promise((_,reject)=>timer=setTimeout(()=>reject(Error('language timeout')),timeout))]);return set(tag);}catch{return set('en');}finally{clearTimeout(timer);}}
function apply(doc){doc.documentElement.lang=language;const walker=doc.createTreeWalker(doc.body,4);let node;while((node=walker.nextNode())){if(node.parentElement.closest('script,style'))continue;let source=textSources.get(node);if(source===undefined){source=node.nodeValue;textSources.set(node,source);}const key=source.trim();if(Object.hasOwn(en,key))node.nodeValue=source.replace(key,t(key));}for(const el of doc.querySelectorAll('[aria-label]')){let source=attrSources.get(el);if(source===undefined){source=el.getAttribute('aria-label');attrSources.set(el,source);}if(Object.hasOwn(en,source))el.setAttribute('aria-label',t(source));}}
const api={t,init,set,normalize,apply,keys:()=>Object.keys(en),get language(){return language;}};root.BlockRushLocale=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
