/*
    UIの非依存.

    ベースのディレクトリ：src/page/pdf

    ※ 以下の「◎」をUIから切り出す必要があり、それらをAbstractAnnoPageなどのクラスにインターフェースとして定義し、
    　　　　それをPDFAnnoとHTMLAnnoでそれぞれ実装することで、UIを再利用できる作りにできそうです。

    Browseボタン
        ・Fileダイアログから読み込んで、PDFとAnnoをメモリ上に保持.
            ◎ loadFiles
                ・PDFとAnnoを読み込んでメモリ上に保持する.
                ・引数：files
                ・戻り値：Promise（処理終了時にresolve）
    PDFドロップダウン
        ・開くとき
            ・PDF一覧を取得して、一覧表示
                ◎ getContentList
                    ・メモリ上に存在するPDF一覧を返却する
                    ・引数：なし
                    ・戻り値：PDF一覧（[{name: "a.pdf", content: "xxx"}, {name: "b.pdf", content: "yyy"}]
                ◎ getDisplayedPDF
                    ・現在ビュワーに表示しているPDFを返却する（リストボックスの`チェックマーク`に利用）
                    ・引数：なし
                    ・戻り値：PDF情報（{name: "a.pdf", content: "xxx"}）、選択なしの場合はnull
        ・Click
            ・選択されたPDFをViewerに表示
                ◎ displayPDF
                    ・引数で指定されたPDFをビュワーに表示する
                    ・引数：PDF名
                    ・戻り値：なし
    Annoドロップダウン
        ・開くとき
            ・Anno一覧を取得して、一覧表示
                ◎ getAnnoFileList
                    ・メモリ上に存在するAnnoFile一覧を返却する
                    ・引数：なし
                    ・戻り値：Anno一覧（[{name: "a.anno", content: "xxx"}, {name: "b.anno", content: "yyy"}]
                ◎ getDisplayedPrimaryAnnoFile
                    ・現在ビュワーに表示しているPrimaryAnnoFileを返却する（リストボックスの`チェックマーク`に利用）
                    ・引数：なし
                    ・戻り値：Anno情報（{name: "a.anno", content: "xxx"}）、選択なしの場合はnull
        ・Click
            ・選択されたAnnoをPrimaryとしてViewerに表示
                ◎ displayPrimaryAnnoFile
                    ・引数で指定されたPrimaryAnnoFileをビュワーに表示する
                    ・引数：AnnoFile名
                    ・戻り値：なし
    Referenceドロップダウン
        ・開くとき
            ・Anno一覧を取得して、一覧表示
                ◎ getAnnoFileList
                    ・同上
                ◎ getDisplayedReferenceAnnoFiles
                    ・現在ビュワーに表示しているReferenceAnnoFileを返却する（リストボックスの`チェックマーク`に利用）
                    ・引数：なし
                    ・戻り値：AnnoFile一覧（[{name: "a.anno", content: "xxx"}, {name: "b.anno", content: "xxx"}]）、選択なしの場合は空配列
        ・Click
            ・選択されたAnnoをReferenceとしてViewerに表示
                ◎ displayReferenceAnnoFiles
                    ・引数で指定されたAnnoFileを追加/削除し、ビュワーに表示する
                    ・引数1：AnnoFile名
                    ・引数2：処理タイプ（Add / Remove）
                    ・戻り値：なし
    AnnoListドロップダウン
        ・開くとき
            ・表示中のPrimaryAnno一覧を取得して、一覧表示
                ◎ getPrimaryAnnos
                    ・現在ビュワーに表示しているPrimaryAnno一覧を返却する.
                    ・引数：なし
                    ・戻り値：PrimaryAnno一覧（[アノテーション情報]）
        ・Click
            ・選択されたAnnoまでスクロールして強調表示
                ◎ scrollToAnno
                    ・引数で指定されたPrimaryAnnoまでビュワーをスクロールする.
                    ・引数：アノテーション情報（またはアノテーションのid）
                    ・戻り値：なし
    Downloadボタン
        ・表示中のPrimaryAnnoをダウンロードできる
                ◎ getPrimaryAnnosAsTOML
                    ・現在ビュワーに表示しているPrimaryAnno一覧をTOML形式で返却する.
                    ・引数：なし
                    ・戻り値：TOMLファイル
    Viewer
        ・ビュワーを表示する
            ◎ displayViewer
                ・ビュワーを表示します
                ・引数：なし
                ・戻り値：なし
    アノテーションツール（Span, Arrow, Rect）
        ・アノテーションをPrimaryとして新規追加する
            ◎ addSpan
                ・Spanを追加します.
                ・引数：なし
                ・戻り値：追加成功の場合はOK、NGの場合はエラー理由（文字列未選択など）
            ◎ addRelation
                ・Relationを追加します.
                ・引数：タイプ（two-way / one-way / link）
                ・戻り値：追加成功の場合はOK、NGの場合はエラー理由（アノテーション未選択など）
            ◎ enableRectMode
                ・Rectを描画する状態にします.
                ・引数：なし
                ・戻り値：なし
            ◎ disableRectMode
                ・Rectの描画状態を解除します.
                ・引数：なし
                ・戻り値：なし
    ラベル入力
        ・ラベルの表示
            ・requestEnableLabel（PDFAnno -> UI へ Window.Event経由で呼び出す）
                ・ラベルインプットに情報を表示します
                ・引数1：テキスト
                ・引数2：状態（読み取り専用 / 書き込み可）
                ・引数3：アノテーションID
                ・戻り値：なし
            ・requestDisableLabel（PDFAnno -> UI へ Window.Event経由で呼び出す）
                ・ラベルインプットを初期状態に戻す
                ・引数：なし
                ・戻り値：なし
        ・ラベルの入力と更新
            ◎ updateLabel
                ・アノテーションの保持するラベルを更新する.（ユーザーの入力に応じて）
                ・引数1：アノテーションID
                ・引数2：変更後のテキスト
                ・戻り値：なし
    PDFアップロード
        ・表示中のPDFをサーバーへアップロード
            ◎ getDisplayedPDF
                ・同上
*/
require("file?name=dist/index.html!./index.html");
require("!style!css!./pdfanno.css");

import { enableAnnotateTool, disableAnnotateTools, clearAllAnnotations } from './page/util/anno';
import { resetPDFViewerSettings } from './page/util/display';

import * as browseButton from './page/ui/browseButton';
import * as pdfDropdown from './page/ui/pdfDropdown';
import * as primaryAnnoDropdown from './page/ui/primaryAnnoDropdown';
import * as annoListDropdown from './page/ui/annoListDropdown';
import * as referenceAnnoDropdown from './page/ui/referenceAnnoDropdown';
import * as downloadButton from './page/ui/downloadButton';
import * as uploadButton from './page/ui/uploadButton';
import * as annotationTools from './page/ui/annotationTools';
import * as inputLabel from './page/ui/inputLabel';

import {
    listenWindowLeaveEvent,
    unlistenWindowLeaveEvent,
    resizeHandler,
    setupResizableColumns
} from './page/util/window';

import * as publicApi from './page/public';

import PDFAnnoPage from './page/pdf/PDFAnnoPage';

/**
 * Global variable.
 */
window.pdfanno = {};

/**
 * Expose public APIs.
 */
window.add = publicApi.addAnnotation;
window.addAll = publicApi.addAllAnnotations;
window.delete = publicApi.deleteAnnotation;
window.RectAnnotation = publicApi.PublicRectAnnotation;
window.SpanAnnotation = publicApi.PublicSpanAnnotation;
window.RelationAnnotation = publicApi.PublicRelationAnnotation;
window.readTOML = publicApi.readTOML;
window.clear = publicApi.clear;

/**
 * Annotation functions for Page.
 */
window.annoPage = new PDFAnnoPage();


// Check Ctrl or Cmd button clicked.
// ** ATTENTION!! ALSO UPDATED by core/index.js **
$(document).on('keydown', e => {

    if (e.keyCode === 17 || e.keyCode === 91) { // 17:ctrlKey, 91:cmdKey
        window.iframeWindow.ctrlPressed = true;
        console.log('ctrl press2!!');
    }

}).on('keyup', e => {

    // Allow any keyboard events for <input/>.
    if (e.target.tagName.toLowerCase() === 'input') {
        return;
    }

    window.iframeWindow.ctrlPressed = false;

    if (e.keyCode === 49) {         // Digit "1"
        annotationTools.createSpan();
    } else if (e.keyCode === 50) {  // Digit "2"
        annotationTools.createRelation('one-way');
    } else if (e.keyCode === 51) {  // Digit "3"
        annotationTools.createRelation('two-way');
    } else if (e.keyCode === 52) {  // Digit "4"
        annotationTools.createRelation('link');
    }
});

/**
    Adjust the height of viewer according to window height.
*/
function adjustViewerSize() {
    window.removeEventListener('resize', resizeHandler);
    window.addEventListener('resize', resizeHandler);
    resizeHandler();
}

/**
 * Start PDFAnno Application.
 */
function startApplication() {

    // Alias for convenience.
    window.iframeWindow = $('#viewer iframe').get(0).contentWindow;

    iframeWindow.addEventListener('DOMContentLoaded', () => {

        // Adjust the height of viewer.
        adjustViewerSize();

        // Reset the confirm dialog at leaving page.
        unlistenWindowLeaveEvent();

        var event = document.createEvent('CustomEvent');
        event.initCustomEvent('iframeDOMContentLoaded', true, true, null);
        window.dispatchEvent(event);

    });

    iframeWindow.addEventListener('annotationrendered', () => {

        // Restore the status of AnnoTools.
        disableAnnotateTools();
        enableAnnotateTool(window.currentAnnoToolType);

        var event = document.createEvent('CustomEvent');
        event.initCustomEvent('annotationrendered', true, true, null);
        window.dispatchEvent(event);
    });

    // Set the confirm dialog when leaving a page.
    iframeWindow.addEventListener('annotationUpdated', () => {
        listenWindowLeaveEvent();

        var event = document.createEvent('CustomEvent');
        event.initCustomEvent('annotationUpdated', true, true, null);
        window.dispatchEvent(event);
    });

    // enable text input.
    iframeWindow.addEventListener('enableTextInput', (e) => {
        console.log('enableTextInput:', e.detail);
        inputLabel.enable(e.detail);
    });

    // disable text input.
    iframeWindow.addEventListener('disappearTextInput', () => {
        console.log('disappearTextInput');
        inputLabel.disable(e.detail);
    });

    iframeWindow.addEventListener('annotationDeleted', e => {
        console.log('annotationDeleted:', e.detail);
        inputLabel.treatAnnotationDeleted(e.detail);
    });

    iframeWindow.addEventListener('annotationHoverIn' , e => {
        console.log('annotationHoverIn:', e.detail);
        inputLabel.handleAnnotationHoverIn(e.detail);
    });

    iframeWindow.addEventListener('annotationHoverOut' , e => {
        console.log('annotationHoverOut:', e.detail);
        inputLabel.handleAnnotationHoverOut(e.detail);
    });

    iframeWindow.addEventListener('annotationSelected' , e => {
        console.log('annotationSelected:', e.detail);
        inputLabel.handleAnnotationSelected(e.detail);
    });

    iframeWindow.addEventListener('annotationDeselected' , () => {
        console.log('annotationDeselected');
        inputLabel.handleAnnotationDeselected();
    });
    iframeWindow.addEventListener('digit1Pressed' , () => {
        annotationTools.createSpan();
    });
    iframeWindow.addEventListener('digit2Pressed' , () => {
        annotationTools.createRelation('one-way');
    });
    iframeWindow.addEventListener('digit3Pressed' , () => {
        annotationTools.createRelation('two-way');
    });
    iframeWindow.addEventListener('digit4Pressed' , () => {
        annotationTools.createRelation('link');
    });
}

/**
 *  The entry point.
 */
window.addEventListener('DOMContentLoaded', e => {

    // Init viewer.
    window.annoPage.displayViewer();

    // Delete prev annotations.
    clearAllAnnotations();

    // Reset PDFViwer settings.
    resetPDFViewerSettings();

    // Start application.
    startApplication();

    // Setup UI parts.
    browseButton.setup();
    pdfDropdown.setup();
    primaryAnnoDropdown.setup();
    referenceAnnoDropdown.setup();
    annoListDropdown.setup();
    downloadButton.setup();
    uploadButton.setup();
    annotationTools.setup();
    inputLabel.setup();

    window.addEventListener('restartApp', startApplication);

    // enable text input.
    window.addEventListener('enableTextInput', (e) => {
        inputLabel.enable(e.detail);
    });

    // disable text input.
    window.addEventListener('disappearTextInput', (e) => {
        inputLabel.disable(e.detail);
    });

    // resizable.
    setupResizableColumns();

});
