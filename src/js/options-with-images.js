
/*
  Created by: Luis Bajana
  Date: March 6, 2017
*/

var OptionsWithImages = {

  show_and_hide: function(){

  },


  insert_after: function( element_to_insert , element_to_insert_before_of ){
    var parent = element_to_insert_before_of.parentNode;
    if (parent.lastChild == element_to_insert_before_of){
      parent.appendChild(element_to_insert);
    }else{
      parent.insertBefore(element_to_insert, element_to_insert_before_of.nextSibling);
    }
  },


  sort_list: function( option_selected , list , original_select ){

    var list_elements = list.childNodes;

    for( var i = 0 ; i < list_elements.length ; i++ ){

      var temp;
      var temp_val;


      if( i === 0 ){

        temp = list_elements[i].innerHTML;
        temp_val = list_elements[i].getAttribute('data-value');

        list_elements[i].innerHTML = option_selected.innerHTML;
        list_elements[i].setAttribute('data-value', option_selected.getAttribute('data-value'));
        continue;
      }

      if( list_elements[i].innerHTML === option_selected.innerHTML ){
        list_elements[i].innerHTML = temp;
        list_elements[i].setAttribute('data-value' , temp_val );
      }

      if( list_elements[i].classList.contains('active') ) list_elements[i].classList.remove('active');

    }

    list_elements[0].classList.add('active');
    original_select.value = list_elements[0].getAttribute('data-value');

  },


  add_listeners_list_element: function( option , list , original_select ){
    option.addEventListener("click" , function(){
      OptionsWithImages.sort_list( option , list , original_select );
    });
  },


  add_listener_list: function( select , original_select ){

    var self = select;
    var options = select.childNodes;

    self.addEventListener("click",function(){
      self.classList.toggle("js-options-with-images-open");
    });

    for( var i = 0 ; i < options.length ; i++ ){
      OptionsWithImages.add_listeners_list_element( options[i] , select , original_select );
    }

  },


  markup_injection: function( select ){

    var new_select = document.createElement("ul");
    new_select.className = 'options-with-images-select';

    for( var i = 0 ; i < select.length ; i++ ){
      var option = document.createElement("li");
      option.innerHTML = "<img src='"+select[i].getAttribute('data-img')+"' />" +"  "+ select[i].innerHTML;
      option.setAttribute( 'data-value',select[i].value );
      if( i === 0 ) option.className += ' active';
      new_select.appendChild( option );
    }

    OptionsWithImages.add_listener_list( new_select , select );
    OptionsWithImages.insert_after( new_select , select );

  },

  collector: function(){

    var selects = document.getElementsByClassName('js-options-with-images');
    for( var i = 0 ; i < selects.length ; i++ ){
      OptionsWithImages.markup_injection( selects[i] );
    }

  },

  init: function(){

    OptionsWithImages.collector();

  }

};
