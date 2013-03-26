// Portions Copyright (c) 2012 jQuery Foundation and other contributors, http://jquery.com/ 


var hasOwn = Object.prototype.hasOwnProperty;
// Shamelessly copied from jquery!
jQuery = $ = {};
jQuery.isPlainObject = function(ele){

  // Must be an Object.
  // Because of IE, we also have to check the presence of the constructor property.
  // Make sure that DOM nodes and window objects don't pass through, as well
  if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
     return false;
  }
  
  // Not own constructor property must be Object
  if ( obj.constructor &&
     !hasOwn.call(obj, "constructor") &&
     !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
     return false;
  }
  
  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.

  var key;
  for ( key in obj ) {}
  
  return key === undefined || hasOwn.call( obj, key );
}
jQuery.isArray = Array.isArray || function( obj ) {
  return jQuery.type(obj) === "array";
}
jQuery.isWindow = function( obj ) {
  return obj && typeof obj === "object" && "setInterval" in obj;
}
jQuery.type = function( obj ) {
  return obj == null ?
     String( obj ) :
     "object";
}

jQuery.isPlainObject = function( obj ) {
  // Must be an Object.
  // Because of IE, we also have to check the presence of the constructor property.
  // Make sure that DOM nodes and window objects don't pass through, as well
  if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
     return false;
  }
  
  // Not own constructor property must be Object
  if ( obj.constructor &&
     !hasOwn.call(obj, "constructor") &&
     !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
     return false;
  }
  
  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.

  var key;
  for ( key in obj ) {}
  
  return key === undefined || hasOwn.call( obj, key );
}
$.support = {};
$.extend = function() {
	 var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

$.tipsy = function(){};
pv.Behavior.tipsy = function(){};

function getCccType(type) {
    if(type){
        var className = type.replace(/^ccc(.*)$/, '$1');
        return pvc[className];
    }
}

// NOTE: this function must be in sync with that of 
// BaseCccComponent#_preProcessChartDefinition
function preProcessChartDefinition(chartDef){
    if(chartDef){
        // Obtain effective compatVersion
        var compatVersion = chartDef.compatVersion;
        if(compatVersion == null){
            compatVersion = typeof pvc.defaultCompatVersion === 'function' ? 
                            pvc.defaultCompatVersion() :
                            1;
        }
        
        if(compatVersion <= 1){
            // Properties that are no more registered in the component
            // and that had a name mapping.
            // The default mapping, for unknown properties, doesn't work.
            if('showLegend' in chartDef){
                chartDef.legend = chartDef.showLegend;
                delete chartDef.showLegend;
            }
            
            // Don't presume chartDef props must be own
            for(var p in chartDef){
                var m = /^barLine(.*)$/.exec(p);
                if(m){
                    p2 = 'secondAxis' + (m[1] || '');
                    chartDef[p2] = chartDef[p];
                    delete chartDef[p];
                }
            }
        }
        
        chartDef.extensionPoints = Dashboards.propertiesArrayToObject(chartDef.extensionPoints);
    }
}

function renderCccFromComponent(component, data) {

	if(typeof component.postFetch === 'function'){
		try{
			data = component.postFetch(data);
		} catch(e) {
            // ignore
            print("Error in postfetch: " + e);
        }
	}
    
    preProcessChartDefinition(component.chartDefinition);
    
    var o = $.extend({}, component.chartDefinition);
    o.showTooltips = false;
    o.clickable    = false;
    o.selectable   = false;
    o.hoverable    = false;
    o.tooltipFormat = function(){};
    
    var ChartType = getCccType(component.type);
    var chart = new ChartType(o);
    
    chart.setData(data, {
        crosstabMode: component.crosstabMode,
        seriesInRows: component.seriesInRows
    });
    chart.render();
}


var Dashboards = Dashboards || {};
Dashboards.propertiesArrayToObject = function(pArray) {
  var obj = {};
  for (p in pArray) if (pArray.hasOwnProperty(p)) {
    var prop = pArray[p];
    obj[prop[0]] = prop[1];
  }
  return obj;
};

Dashboards.objectToPropertiesArray = function(obj) {
  var pArray = [];
  for (key in obj) if (obj.hasOwnProperty(key)) {
    pArray.push([key,obj[key]]);
  }
  return pArray;
};

Dashboards.log = function(m,type){ 
	if (type)
		print(type + ": " + m);
	else
		print("LOG: " + m);
};