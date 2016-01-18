/*
NAME : MJSELECT
DESCRIPTION : MJSELECR is a simple selector in pure javascript & CSS3
AUTHOR : MORGAN JOURDIN
VERSION : 1.0
*/

var mjselect = function() {
    this.init();
};

mjselect.prototype = {

    init: function() {
        this.sltor =  document.getElementsByTagName('select');
        this.textFirstSelect = 'Select element';
        this.classname = 'active';
        //Add link css to head
        this.addCss();
        //Construct mjselect
        this.constructselect();
        //Event on click
        this.eventClick();
    },

    constructselect: function() {
        var elmt = this.sltor, i, list, Newdiv, Newul, Newspan, wrapParent, wrap, _this = this;

        for (i = 0; i < elmt.length; i++) {
            //Hide select
            elmt[i].style.display = 'none';
            elmt[i].setAttribute('id', 'mjselector-'+i);

            //Search parent for add new select
            wrapParent = elmt[i].parentNode;

            //Create wrap div selectormj
            Newdiv = document.createElement('div');
            Newdiv.setAttribute('class', 'selectormj');
            Newdiv.setAttribute('id', 'selectormj-'+i);
            Newdiv.dataset.nb = i; 

            //Create ul elmt
            Newul = document.createElement('ul');
            Newul.setAttribute('class', 'ulmj');
            Newul.setAttribute('id', 'ulmj-'+i);

            //Create span elmt
            Newspan = document.createElement('span');
            Newspan.setAttribute('class', 'rslttmj');
            Newspan.setAttribute('id', 'rslttmj-'+i);
            Newspan.appendChild(document.createTextNode(this.textFirstSelect));
            Newdiv.appendChild(Newspan);

            //Recup li
            list = this.constructcontentselect(elmt[i]);

            //Add li to ul
            Newul.innerHTML = list;
            Newdiv.appendChild(Newul);

            //Add span elmt & ul to parent div
            wrapParent.appendChild(Newdiv);
        }
    },

    constructcontentselect: function(Newelmt) {
        var i, Newlist = '', opt = Newelmt.options;

        for (i = 0; i < opt.length; i++) {    
            if(opt[i].value === '-'){
                Newlist += '<li data-value="first">'+this.textFirstSelect+'</li>';
            } else{
                Newlist += '<li data-value="'+opt[i].value+'">'+opt[i].text+'</li>';
            }
        }

        return Newlist;
    },

    addCss: function() {
        var link = document.createElement('link');

        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', 'css/mjselect.css');

        document.getElementsByTagName('head')[0].appendChild(link);
    },

    eventClick: function() {
        var _this = this;
        var btn = document.querySelectorAll('.ulmj');

        for(var j = 0; j < btn.length; j++){
            for(var i = 0; i < btn[j].getElementsByTagName('li').length; i++) {

                var list = btn[j].getElementsByTagName('li');

                list[i].addEventListener('click', function(){
                    var text = this.innerHTML;
                    var nb = this.parentNode.parentNode.dataset.nb;
                    var Newval = this.dataset.value;
                    //Display value text in span
                    document.getElementById('rslttmj-'+nb).innerHTML = text;
                    //Remove all class
                    _this.removeClassElmt(nb);
                    //Add class to element clicked
                    this.classList.add(_this.classname);
                    //selected in true select
                    _this.seletedSelect(Newval, nb);
                });
            }
        }
    },

    removeClassElmt: function(nb) {
        if(document.getElementById('ulmj-'+nb).getElementsByClassName(this.classname).length !== 0){
            for(var j = 0; j < document.getElementById('ulmj-'+nb).getElementsByTagName('li').length; j++){
                document.getElementById('ulmj-'+nb).getElementsByTagName('li')[j].classList.remove(this.classname);
            }
        }
    },

    seletedSelect: function(val, nb) {
        var opt = document.getElementById('mjselector-'+nb).options;
        for(var j = 0; j < opt.length; j++){
            if(opt[j].value == val){
                opt[j].setAttribute('selected', 'selected');
            }else {
                opt[j].removeAttribute('selected');
            }
        }
    }
}