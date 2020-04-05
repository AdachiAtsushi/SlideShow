/**
 *
 * @author atsuk0r0
 * @since 2020/04/05
 */

'use strict';

{
  // 画像の配列を初期化
  const images = [
    'img/pic00.png',
    'img/pic01.png',
    'img/pic02.png',
    'img/pic03.png',
    'img/pic04.png',
    'img/pic05.png',
    'img/pic06.png',
    'img/pic07.png',
  ];

  let currentIndex = 0;

  // 画像が格納された配列から最初の画像を取得し、main要素に設定
  const mainImage = document.getElementById('main');
  mainImage.src = images[currentIndex];

  images.forEach((image, index) => {
    // img要素を生成し、画像を設定
    const img = document.createElement('img');
    img.src = image;

    const li = document.createElement('li');
    // インデックスが0だった場合
    if (index === currentIndex) {
      // li要素にcurrentクラスのスタイルを適用
      li.classList.add('current');
    }
    // li要素にクリックされた場合
    li.addEventListener('click', () => {
      // クリックされた画像をメイン画像として設定
      mainImage.src = image;

      // thumbnails配下のli要素を全て取得
      const thumbnails = document.querySelectorAll('.thumbnails > li');

      // li要素のcurrentクラスのスタイルを削除
      thumbnails[currentIndex].classList.remove('current');

      // 画像に紐づくインデックスを現在選択しているインデックスに設定
      currentIndex = index;

      // 現在選択しているサムネイルに対してcurrentクラスのスタイルを適用
      thumbnails[currentIndex].classList.add('current');
    });

    // li要素の子要素として画像を追加
    li.appendChild(img);
    // サムネイルの子要素にli要素を追加
    document.querySelector('.thumbnails').appendChild(li);
  });

  // 画面上のnextというIDに対してクリックイベント追加
  const next = document.getElementById('next');
  next.addEventListener('click', () => {
    // 現在のインデックスから次のインデックスを取得
    let target = currentIndex + 1;
    // 取得したインデックスが画像の配列の長さと同じになった場合
    if (target === images.length) {
      // 配列の先頭を指定
      target = 0;
    }
    // 取得した要素をクリックする
    document.querySelectorAll('.thumbnails > li')[target].click();
  });

  // 画面上のprevというIDに対してクリックイベントを追加
  const prev = document.getElementById('prev');
  prev.addEventListener('click', () => {
    // 現在のインデックスから前のインデックスを取得
    let target = currentIndex - 1;
    // 取得したインデックスが0未満になった場合
    if (target < 0) {
      // 画像の最終要素のインデックスを指定
      target = images.length - 1;
    }
    // 取得した要素をクリックする
    document.querySelectorAll('.thumbnails > li')[target].click();
  });

  let timeoutId;

  /**
   *
   * 【処理の内容】
   * 次へボタンを1秒ごとに再帰的に押下する。
   */
  function playSlideshow() {
    timeoutId = setTimeout(() => {
      // 次へボタンを押下
      next.click();
      playSlideshow();
    }, 1000);
  }

  // スライドショー実施判定フラグ
  let isPlaying = false;

  const play = document.getElementById('play');
  play.addEventListener('click', () => {
    // isPlayingがtrueだった場合（スライドショーを行われていた場合）
    if (isPlaying) {
      // 再帰処理を停止
      clearTimeout(timeoutId);
      // Playボタンの表記を'Play'とする
      play.textContent = 'Play';
    } else {
      // スライドショー開始
      playSlideshow();
      // Playボタンの表記を'Pause'とする
      play.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
  });
}
