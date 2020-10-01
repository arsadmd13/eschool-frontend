import { Component, OnInit, ViewChild } from '@angular/core';
import FroalaEditor from 'froala-editor';
import * as Editor from '@ckeditor/ckeditor5-build-decoupled-document';
// import * as Editor from '@ckeditor/ckeditor-custom-build'
import { MyUploadAdapter } from './uploader.service';
import { PdfService } from '../services/other/topdf.service'
@Component({
  selector: 'app-wysiwyg-editor',
  templateUrl: './wysiwyg-editor.component.html',
  styleUrls: ['./wysiwyg-editor.component.css']
})
export class WysiwygEditorComponent implements OnInit {

  element: any;
  link: string;

  public Editor = Editor;
  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'paragraphStyle', 'lineHeight', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', 'print', 'getPDF', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
    toolbarButtonsXS: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'paragraphStyle', 'lineHeight', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', 'print', 'getPDF', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
    toolbarButtonsSM: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'paragraphStyle', 'lineHeight', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', 'print', 'getPDF', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
    toolbarButtonsMD: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'paragraphStyle', 'lineHeight', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', 'print', 'getPDF', 'spellChecker', 'help', 'html', '|', 'undo', 'redo']
  };

  ckeditor;
  public onReady( editor ) {
    this.ckeditor = editor;
    editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      console.log(btoa(loader.file));
      return new MyUploadAdapter(loader);
    };
    // editor.ui
    //   .getEditableElement()
    //   .parentElement.insertBefore(
    //     editor.ui.view.toolbar.element,
    //     editor.ui.getEditableElement()
    //   );
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
  );
}
@ViewChild('myEditor') myEditor: any;

  saveArticle() {
    console.log(this.getArticleContent());
    const data = {
      htm: this.getArticleContent()
    }
    console.log("dndnndn");
    
    console.log(data);
    
    this.pdfService.convert(data).subscribe(
      (res: any) => {
        console.log(res);
        
      }, (error) => {
        console.log(error);
        
      }
    )
  }

  private getArticleContent() {
    if (this.myEditor && this.myEditor.editorInstance) {
      console.log("dndnndn");

      return this.myEditor.editorInstance.getData();
    }

    return '';
  }

  constructor(private pdfService: PdfService) { 
  }

  ngOnInit() {
    FroalaEditor.DefineIcon('alert', {NAME: 'info'});
    FroalaEditor.RegisterCommand('alert', {
      title: 'Hello',
      focus: false,
      undo: false,
      refreshAfterCallback: false,

      callback: () => {
        alert('Hello!');
      }
    });
  }

  log(e){
    this.element = e
    console.log(e);
    console.log(document.getElementById('editor')); 
  }

  clog(){
    console.log(this.element);
    console.log(document.getElementById('editor'));
    console.log(document.getElementsByClassName('ql-editor')[0].innerHTML);
  }

  getDataUrl(img) {
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Set width and height
    canvas.width = img.width;
    canvas.height = img.height;
    // Draw the image
    ctx.drawImage(img, 0, 0);
    console.log(canvas.toDataURL('image/jpeg'));
    
    return canvas.toDataURL('image/jpeg');
 }

 ccklog(){
  console.log(this.ckeditor);
  console.log(this.ckeditor.getData());
  document.getElementById('testDiv').innerHTML = this.ckeditor.getData();
}

 makepdf(){
  console.log(document.getElementsByClassName('ck-editor__editable_inline')[0].innerHTML);
  const data = {
    htm: document.getElementsByClassName('ck-editor__editable_inline')[0].innerHTML
  }
  this.pdfService.convert(data).subscribe(
    (res: any) => {
      console.log(res);

      if(res.status === 200){
        this.link = res.link;
      }
      
    }, (error) => {
      console.log(error);
      
    }
  )
  
 }
 public downloadAsPDF() {


}

}
