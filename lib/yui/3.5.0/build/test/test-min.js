/*
YUI 3.5.0 (build 5089)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("test",function(e){var d={version:"3.5.0"};e.namespace("Test");d.Object=e.Object;d.Array=e.Array;d.Util={mix:e.mix,JSON:e.JSON};d.EventTarget=function(){this._handlers={};};d.EventTarget.prototype={constructor:d.EventTarget,attach:function(f,g){if(typeof this._handlers[f]=="undefined"){this._handlers[f]=[];}this._handlers[f].push(g);},subscribe:function(f,g){this.attach.apply(this,arguments);},fire:function(j){if(typeof j=="string"){j={type:j};}if(!j.target){j.target=this;}if(!j.type){throw new Error("Event object missing 'type' property.");}if(this._handlers[j.type] instanceof Array){var g=this._handlers[j.type];for(var h=0,f=g.length;h<f;h++){g[h].call(this,j);}}},detach:function(j,k){if(this._handlers[j] instanceof Array){var g=this._handlers[j];for(var h=0,f=g.length;h<f;h++){if(g[h]===k){g.splice(h,1);break;}}}},unsubscribe:function(f,g){this.detach.apply(this,arguments);}};d.TestSuite=function(f){this.name="";this.items=[];if(typeof f=="string"){this.name=f;}else{if(f instanceof Object){for(var g in f){if(f.hasOwnProperty(g)){this[g]=f[g];}}}}if(this.name===""){this.name="testSuite"+(+new Date());}};d.TestSuite.prototype={constructor:d.TestSuite,add:function(f){if(f instanceof d.TestSuite||f instanceof d.TestCase){this.items.push(f);}return this;},setUp:function(){},tearDown:function(){}};d.TestCase=function(f){this._should={};for(var g in f){this[g]=f[g];}if(typeof this.name!="string"){this.name="testCase"+(+new Date());}};d.TestCase.prototype={constructor:d.TestCase,callback:function(){return d.TestRunner.callback.apply(d.TestRunner,arguments);},resume:function(f){d.TestRunner.resume(f);},wait:function(h,f){var g=(typeof h=="number"?h:f);g=(typeof g=="number"?g:10000);if(typeof h=="function"){throw new d.Wait(h,g);}else{throw new d.Wait(function(){d.Assert.fail("Timeout: wait() called but resume() never called.");},g);}},assert:function(g,f){d.Assert._increment();if(!g){throw new d.AssertionError(d.Assert._formatMessage(f,"Assertion failed."));}},fail:function(f){d.Assert.fail(f);},init:function(){},destroy:function(){},setUp:function(){},tearDown:function(){}};d.TestFormat=function(){function f(g){return g.replace(/[<>"'&]/g,function(h){switch(h){case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&apos;";case"&":return"&amp;";}});}return{JSON:function(g){return d.Util.JSON.stringify(g);},XML:function(h){function g(j){var i="<"+j.type+' name="'+f(j.name)+'"';if(typeof(j.duration)=="number"){i+=' duration="'+j.duration+'"';}if(j.type=="test"){i+=' result="'+j.result+'" message="'+f(j.message)+'">';}else{i+=' passed="'+j.passed+'" failed="'+j.failed+'" ignored="'+j.ignored+'" total="'+j.total+'">';for(var k in j){if(j.hasOwnProperty(k)){if(j[k]&&typeof j[k]=="object"&&!(j[k] instanceof Array)){i+=g(j[k]);}}}}i+="</"+j.type+">";return i;}return'<?xml version="1.0" encoding="UTF-8"?>'+g(h);},JUnitXML:function(g){function h(j){var i="";switch(j.type){case"test":if(j.result!="ignore"){i='<testcase name="'+f(j.name)+'" time="'+(j.duration/1000)+'">';if(j.result=="fail"){i+='<failure message="'+f(j.message)+'"><![CDATA['+j.message+"]]></failure>";}i+="</testcase>";}break;case"testcase":i='<testsuite name="'+f(j.name)+'" tests="'+j.total+'" failures="'+j.failed+'" time="'+(j.duration/1000)+'">';for(var k in j){if(j.hasOwnProperty(k)){if(j[k]&&typeof j[k]=="object"&&!(j[k] instanceof Array)){i+=h(j[k]);}}}i+="</testsuite>";break;case"testsuite":for(var k in j){if(j.hasOwnProperty(k)){if(j[k]&&typeof j[k]=="object"&&!(j[k] instanceof Array)){i+=h(j[k]);}}}break;case"report":i="<testsuites>";for(var k in j){if(j.hasOwnProperty(k)){if(j[k]&&typeof j[k]=="object"&&!(j[k] instanceof Array)){i+=h(j[k]);}}}i+="</testsuites>";}return i;}return'<?xml version="1.0" encoding="UTF-8"?>'+h(g);},TAP:function(h){var i=1;function g(j){var k="";switch(j.type){case"test":if(j.result!="ignore"){k="ok "+(i++)+" - "+j.name;if(j.result=="fail"){k="not "+k+" - "+j.message;}k+="\n";}else{k="#Ignored test "+j.name+"\n";}break;case"testcase":k="#Begin testcase "+j.name+"("+j.failed+" failed of "+j.total+")\n";for(var l in j){if(j.hasOwnProperty(l)){if(j[l]&&typeof j[l]=="object"&&!(j[l] instanceof Array)){k+=g(j[l]);}}}k+="#End testcase "+j.name+"\n";break;case"testsuite":k="#Begin testsuite "+j.name+"("+j.failed+" failed of "+j.total+")\n";for(var l in j){if(j.hasOwnProperty(l)){if(j[l]&&typeof j[l]=="object"&&!(j[l] instanceof Array)){k+=g(j[l]);}}}k+="#End testsuite "+j.name+"\n";break;case"report":for(var l in j){if(j.hasOwnProperty(l)){if(j[l]&&typeof j[l]=="object"&&!(j[l] instanceof Array)){k+=g(j[l]);}}}}return k;}return"1.."+h.total+"\n"+g(h);}};}();d.Reporter=function(f,g){this.url=f;this.format=g||d.TestFormat.XML;this._fields=new Object();this._form=null;this._iframe=null;};d.Reporter.prototype={constructor:d.Reporter,addField:function(f,g){this._fields[f]=g;},clearFields:function(){this._fields=new Object();},destroy:function(){if(this._form){this._form.parentNode.removeChild(this._form);this._form=null;}if(this._iframe){this._iframe.parentNode.removeChild(this._iframe);this._iframe=null;}this._fields=null;},report:function(h){if(!this._form){this._form=document.createElement("form");this._form.method="post";this._form.style.visibility="hidden";this._form.style.position="absolute";this._form.style.top=0;document.body.appendChild(this._form);try{this._iframe=document.createElement('<iframe name="yuiTestTarget" />');}catch(g){this._iframe=document.createElement("iframe");this._iframe.name="yuiTestTarget";}this._iframe.src="javascript:false";this._iframe.style.visibility="hidden";this._iframe.style.position="absolute";this._iframe.style.top=0;document.body.appendChild(this._iframe);this._form.target="yuiTestTarget";}this._form.action=this.url;while(this._form.hasChildNodes()){this._form.removeChild(this._form.lastChild);}this._fields.results=this.format(h);this._fields.useragent=navigator.userAgent;this._fields.timestamp=(new Date()).toLocaleString();for(var j in this._fields){var i=this._fields[j];
if(this._fields.hasOwnProperty(j)&&(typeof i!="function")){var f=document.createElement("input");f.type="hidden";f.name=j;f.value=i;this._form.appendChild(f);}}delete this._fields.results;delete this._fields.useragent;delete this._fields.timestamp;if(arguments[1]!==false){this._form.submit();}}};d.TestRunner=function(){function h(k,m){if(!m.length){return true;}else{if(k){for(var l=0,j=k.length;l<j;l++){if(m.indexOf(","+k[l]+",")>-1){return true;}}}return false;}}function g(i){this.testObject=i;this.firstChild=null;this.lastChild=null;this.parent=null;this.next=null;this.results=new d.Results();if(i instanceof d.TestSuite){this.results.type="testsuite";this.results.name=i.name;}else{if(i instanceof d.TestCase){this.results.type="testcase";this.results.name=i.name;}}}g.prototype={appendChild:function(i){var j=new g(i);if(this.firstChild===null){this.firstChild=this.lastChild=j;}else{this.lastChild.next=j;this.lastChild=j;}j.parent=this;return j;}};function f(){d.EventTarget.call(this);this.masterSuite=new d.TestSuite("yuitests"+(new Date()).getTime());this._cur=null;this._root=null;this._log=true;this._waiting=false;this._running=false;this._lastResults=null;this._context=null;this._groups="";}f.prototype=d.Util.mix(new d.EventTarget(),{_ignoreEmpty:false,constructor:d.TestRunner,TEST_CASE_BEGIN_EVENT:"testcasebegin",TEST_CASE_COMPLETE_EVENT:"testcasecomplete",TEST_SUITE_BEGIN_EVENT:"testsuitebegin",TEST_SUITE_COMPLETE_EVENT:"testsuitecomplete",TEST_PASS_EVENT:"pass",TEST_FAIL_EVENT:"fail",ERROR_EVENT:"error",TEST_IGNORE_EVENT:"ignore",COMPLETE_EVENT:"complete",BEGIN_EVENT:"begin",_addTestCaseToTestTree:function(j,k){var l=j.appendChild(k),m,i;for(m in k){if((m.indexOf("test")===0||m.indexOf(" ")>-1)&&typeof k[m]=="function"){l.appendChild(m);}}},_addTestSuiteToTestTree:function(j,m){var l=j.appendChild(m);for(var k=0;k<m.items.length;k++){if(m.items[k] instanceof d.TestSuite){this._addTestSuiteToTestTree(l,m.items[k]);}else{if(m.items[k] instanceof d.TestCase){this._addTestCaseToTestTree(l,m.items[k]);}}}},_buildTestTree:function(){this._root=new g(this.masterSuite);for(var j=0;j<this.masterSuite.items.length;j++){if(this.masterSuite.items[j] instanceof d.TestSuite){this._addTestSuiteToTestTree(this._root,this.masterSuite.items[j]);}else{if(this.masterSuite.items[j] instanceof d.TestCase){this._addTestCaseToTestTree(this._root,this.masterSuite.items[j]);}}}},_handleTestObjectComplete:function(j){var i;if(j&&(typeof j.testObject=="object")){i=j.parent;if(i){i.results.include(j.results);i.results[j.testObject.name]=j.results;}if(j.testObject instanceof d.TestSuite){this._execNonTestMethod(j,"tearDown",false);j.results.duration=(new Date())-j._start;this.fire({type:this.TEST_SUITE_COMPLETE_EVENT,testSuite:j.testObject,results:j.results});}else{if(j.testObject instanceof d.TestCase){this._execNonTestMethod(j,"destroy",false);j.results.duration=(new Date())-j._start;this.fire({type:this.TEST_CASE_COMPLETE_EVENT,testCase:j.testObject,results:j.results});}}}},_next:function(){if(this._cur===null){this._cur=this._root;}else{if(this._cur.firstChild){this._cur=this._cur.firstChild;}else{if(this._cur.next){this._cur=this._cur.next;}else{while(this._cur&&!this._cur.next&&this._cur!==this._root){this._handleTestObjectComplete(this._cur);this._cur=this._cur.parent;}this._handleTestObjectComplete(this._cur);if(this._cur==this._root){this._cur.results.type="report";this._cur.results.timestamp=(new Date()).toLocaleString();this._cur.results.duration=(new Date())-this._cur._start;this._lastResults=this._cur.results;this._running=false;this.fire({type:this.COMPLETE_EVENT,results:this._lastResults});this._cur=null;}else{if(this._cur){this._cur=this._cur.next;}}}}}return this._cur;},_execNonTestMethod:function(m,i,n){var j=m.testObject,l={type:this.ERROR_EVENT};try{if(n&&j["async:"+i]){j["async:"+i](this._context);return true;}else{j[i](this._context);}}catch(k){m.results.errors++;l.error=k;l.methodName=i;if(j instanceof d.TestCase){l.testCase=j;}else{l.testSuite=testSuite;}this.fire(l);}return false;},_run:function(){var k=false;var j=this._next();if(j!==null){this._running=true;this._lastResult=null;var i=j.testObject;if(typeof i=="object"&&i!==null){if(i instanceof d.TestSuite){this.fire({type:this.TEST_SUITE_BEGIN_EVENT,testSuite:i});j._start=new Date();this._execNonTestMethod(j,"setUp",false);}else{if(i instanceof d.TestCase){this.fire({type:this.TEST_CASE_BEGIN_EVENT,testCase:i});j._start=new Date();if(this._execNonTestMethod(j,"init",true)){return;}}}if(typeof setTimeout!="undefined"){setTimeout(function(){d.TestRunner._run();},0);}else{this._run();}}else{this._runTest(j);}}},_resumeTest:function(n){var i=this._cur;this._waiting=false;if(!i){return;}var o=i.testObject;var l=i.parent.testObject;if(l.__yui_wait){clearTimeout(l.__yui_wait);delete l.__yui_wait;}var r=o.indexOf("fail:")===0||(l._should.fail||{})[o];var j=(l._should.error||{})[o];var m=false;var p=null;try{n.call(l,this._context);if(d.Assert._getCount()==0&&!this._ignoreEmpty){throw new d.AssertionError("Test has no asserts.");}else{if(r){p=new d.ShouldFail();m=true;}else{if(j){p=new d.ShouldError();m=true;}}}}catch(q){if(l.__yui_wait){clearTimeout(l.__yui_wait);delete l.__yui_wait;}if(q instanceof d.AssertionError){if(!r){p=q;m=true;}}else{if(q instanceof d.Wait){if(typeof q.segment=="function"){if(typeof q.delay=="number"){if(typeof setTimeout!="undefined"){l.__yui_wait=setTimeout(function(){d.TestRunner._resumeTest(q.segment);},q.delay);this._waiting=true;}else{throw new Error("Asynchronous tests not supported in this environment.");}}}return;}else{if(!j){p=new d.UnexpectedError(q);m=true;}else{if(typeof j=="string"){if(q.message!=j){p=new d.UnexpectedError(q);m=true;}}else{if(typeof j=="function"){if(!(q instanceof j)){p=new d.UnexpectedError(q);m=true;}}else{if(typeof j=="object"&&j!==null){if(!(q instanceof j.constructor)||q.message!=j.message){p=new d.UnexpectedError(q);m=true;}}}}}}}}if(m){this.fire({type:this.TEST_FAIL_EVENT,testCase:l,testName:o,error:p});
}else{this.fire({type:this.TEST_PASS_EVENT,testCase:l,testName:o});}this._execNonTestMethod(i.parent,"tearDown",false);d.Assert._reset();var k=(new Date())-i._start;i.parent.results[o]={result:m?"fail":"pass",message:p?p.getMessage():"Test passed",type:"test",name:o,duration:k};if(m){i.parent.results.failed++;}else{i.parent.results.passed++;}i.parent.results.total++;if(typeof setTimeout!="undefined"){setTimeout(function(){d.TestRunner._run();},0);}else{this._run();}},_handleError:function(i){if(this._waiting){this._resumeTest(function(){throw i;});}else{throw i;}},_runTest:function(l){var i=l.testObject,j=l.parent.testObject,m=j[i],k=i.indexOf("ignore:")===0||!h(j.groups,this._groups)||(j._should.ignore||{})[i];if(k){l.parent.results[i]={result:"ignore",message:"Test ignored",type:"test",name:i.indexOf("ignore:")===0?i.substring(7):i};l.parent.results.ignored++;l.parent.results.total++;this.fire({type:this.TEST_IGNORE_EVENT,testCase:j,testName:i});if(typeof setTimeout!="undefined"){setTimeout(function(){d.TestRunner._run();},0);}else{this._run();}}else{l._start=new Date();this._execNonTestMethod(l.parent,"setUp",false);this._resumeTest(m);}},getName:function(){return this.masterSuite.name;},setName:function(i){this.masterSuite.name=i;},add:function(i){this.masterSuite.add(i);return this;},clear:function(){this.masterSuite=new d.TestSuite("yuitests"+(new Date()).getTime());},isWaiting:function(){return this._waiting;},isRunning:function(){return this._running;},getResults:function(i){if(!this._running&&this._lastResults){if(typeof i=="function"){return i(this._lastResults);}else{return this._lastResults;}}else{return null;}},getCoverage:function(i){if(!this._running&&typeof _yuitest_coverage=="object"){if(typeof i=="function"){return i(_yuitest_coverage);}else{return _yuitest_coverage;}}else{return null;}},callback:function(){var k=arguments,j=this._context,i=this;return function(){for(var l=0;l<arguments.length;l++){j[k[l]]=arguments[l];}i._run();};},resume:function(i){if(this._waiting){this._resumeTest(i||function(){});}else{throw new Error("resume() called without wait().");}},run:function(j){j=j||{};var k=d.TestRunner,i=j.oldMode;if(!i&&this.masterSuite.items.length==1&&this.masterSuite.items[0] instanceof d.TestSuite){this.masterSuite=this.masterSuite.items[0];}k._groups=(j.groups instanceof Array)?","+j.groups.join(",")+",":"";k._buildTestTree();k._context={};k._root._start=new Date();k.fire(k.BEGIN_EVENT);k._run();}});return new f();}();d.ArrayAssert={_indexOf:function(g,h){if(g.indexOf){return g.indexOf(h);}else{for(var f=0;f<g.length;f++){if(g[f]===h){return f;}}return -1;}},_some:function(g,h){if(g.some){return g.some(h);}else{for(var f=0;f<g.length;f++){if(h(g[f])){return true;}}return false;}},contains:function(h,g,f){d.Assert._increment();if(this._indexOf(g,h)==-1){d.Assert.fail(d.Assert._formatMessage(f,"Value "+h+" ("+(typeof h)+") not found in array ["+g+"]."));}},containsItems:function(h,j,g){d.Assert._increment();for(var f=0;f<h.length;f++){if(this._indexOf(j,h[f])==-1){d.Assert.fail(d.Assert._formatMessage(g,"Value "+h[f]+" ("+(typeof h[f])+") not found in array ["+j+"]."));}}},containsMatch:function(h,g,f){d.Assert._increment();if(typeof h!="function"){throw new TypeError("ArrayAssert.containsMatch(): First argument must be a function.");}if(!this._some(g,h)){d.Assert.fail(d.Assert._formatMessage(f,"No match found in array ["+g+"]."));}},doesNotContain:function(h,g,f){d.Assert._increment();if(this._indexOf(g,h)>-1){d.Assert.fail(d.Assert._formatMessage(f,"Value found in array ["+g+"]."));}},doesNotContainItems:function(h,j,g){d.Assert._increment();for(var f=0;f<h.length;f++){if(this._indexOf(j,h[f])>-1){d.Assert.fail(d.Assert._formatMessage(g,"Value found in array ["+j+"]."));}}},doesNotContainMatch:function(h,g,f){d.Assert._increment();if(typeof h!="function"){throw new TypeError("ArrayAssert.doesNotContainMatch(): First argument must be a function.");}if(this._some(g,h)){d.Assert.fail(d.Assert._formatMessage(f,"Value found in array ["+g+"]."));}},indexOf:function(k,j,f,h){d.Assert._increment();for(var g=0;g<j.length;g++){if(j[g]===k){if(f!=g){d.Assert.fail(d.Assert._formatMessage(h,"Value exists at index "+g+" but should be at index "+f+"."));}return;}}d.Assert.fail(d.Assert._formatMessage(h,"Value doesn't exist in array ["+j+"]."));},itemsAreEqual:function(h,j,g){d.Assert._increment();if(typeof h!="object"||typeof j!="object"){d.Assert.fail(d.Assert._formatMessage(g,"Value should be an array."));}if(h.length!=j.length){d.Assert.fail(d.Assert._formatMessage(g,"Array should have a length of "+h.length+" but has a length of "+j.length+"."));}for(var f=0;f<h.length;f++){if(h[f]!=j[f]){throw new d.ComparisonFailure(d.Assert._formatMessage(g,"Values in position "+f+" are not equal."),h[f],j[f]);}}},itemsAreEquivalent:function(j,k,f,h){d.Assert._increment();if(typeof f!="function"){throw new TypeError("ArrayAssert.itemsAreEquivalent(): Third argument must be a function.");}if(j.length!=k.length){d.Assert.fail(d.Assert._formatMessage(h,"Array should have a length of "+j.length+" but has a length of "+k.length));}for(var g=0;g<j.length;g++){if(!f(j[g],k[g])){throw new d.ComparisonFailure(d.Assert._formatMessage(h,"Values in position "+g+" are not equivalent."),j[g],k[g]);}}},isEmpty:function(g,f){d.Assert._increment();if(g.length>0){d.Assert.fail(d.Assert._formatMessage(f,"Array should be empty."));}},isNotEmpty:function(g,f){d.Assert._increment();if(g.length===0){d.Assert.fail(d.Assert._formatMessage(f,"Array should not be empty."));}},itemsAreSame:function(h,j,g){d.Assert._increment();if(h.length!=j.length){d.Assert.fail(d.Assert._formatMessage(g,"Array should have a length of "+h.length+" but has a length of "+j.length));}for(var f=0;f<h.length;f++){if(h[f]!==j[f]){throw new d.ComparisonFailure(d.Assert._formatMessage(g,"Values in position "+f+" are not the same."),h[f],j[f]);}}},lastIndexOf:function(k,j,f,h){for(var g=j.length;g>=0;g--){if(j[g]===k){if(f!=g){d.Assert.fail(d.Assert._formatMessage(h,"Value exists at index "+g+" but should be at index "+f+"."));
}return;}}d.Assert.fail(d.Assert._formatMessage(h,"Value doesn't exist in array."));}};d.Assert={_asserts:0,_formatMessage:function(g,f){if(typeof g=="string"&&g.length>0){return g.replace("{message}",f);}else{return f;}},_getCount:function(){return this._asserts;},_increment:function(){this._asserts++;},_reset:function(){this._asserts=0;},fail:function(f){throw new d.AssertionError(d.Assert._formatMessage(f,"Test force-failed."));},pass:function(f){d.Assert._increment();},areEqual:function(g,h,f){d.Assert._increment();if(g!=h){throw new d.ComparisonFailure(d.Assert._formatMessage(f,"Values should be equal."),g,h);}},areNotEqual:function(f,h,g){d.Assert._increment();if(f==h){throw new d.UnexpectedValue(d.Assert._formatMessage(g,"Values should not be equal."),f);}},areNotSame:function(f,h,g){d.Assert._increment();if(f===h){throw new d.UnexpectedValue(d.Assert._formatMessage(g,"Values should not be the same."),f);}},areSame:function(g,h,f){d.Assert._increment();if(g!==h){throw new d.ComparisonFailure(d.Assert._formatMessage(f,"Values should be the same."),g,h);}},isFalse:function(g,f){d.Assert._increment();if(false!==g){throw new d.ComparisonFailure(d.Assert._formatMessage(f,"Value should be false."),false,g);}},isTrue:function(g,f){d.Assert._increment();if(true!==g){throw new d.ComparisonFailure(d.Assert._formatMessage(f,"Value should be true."),true,g);}},isNaN:function(g,f){d.Assert._increment();if(!isNaN(g)){throw new d.ComparisonFailure(d.Assert._formatMessage(f,"Value should be NaN."),NaN,g);}},isNotNaN:function(g,f){d.Assert._increment();if(isNaN(g)){throw new d.UnexpectedValue(d.Assert._formatMessage(f,"Values should not be NaN."),NaN);}},isNotNull:function(g,f){d.Assert._increment();if(g===null){throw new d.UnexpectedValue(d.Assert._formatMessage(f,"Values should not be null."),null);}},isNotUndefined:function(g,f){d.Assert._increment();if(typeof g=="undefined"){throw new d.UnexpectedValue(d.Assert._formatMessage(f,"Value should not be undefined."),undefined);}},isNull:function(g,f){d.Assert._increment();if(g!==null){throw new d.ComparisonFailure(d.Assert._formatMessage(f,"Value should be null."),null,g);}},isUndefined:function(g,f){d.Assert._increment();if(typeof g!="undefined"){throw new d.ComparisonFailure(d.Assert._formatMessage(f,"Value should be undefined."),undefined,g);}},isArray:function(h,g){d.Assert._increment();var f=false;if(Array.isArray){f=!Array.isArray(h);}else{f=Object.prototype.toString.call(h)!="[object Array]";}if(f){throw new d.UnexpectedValue(d.Assert._formatMessage(g,"Value should be an array."),h);}},isBoolean:function(g,f){d.Assert._increment();if(typeof g!="boolean"){throw new d.UnexpectedValue(d.Assert._formatMessage(f,"Value should be a Boolean."),g);}},isFunction:function(g,f){d.Assert._increment();if(!(g instanceof Function)){throw new d.UnexpectedValue(d.Assert._formatMessage(f,"Value should be a function."),g);}},isInstanceOf:function(g,h,f){d.Assert._increment();if(!(h instanceof g)){throw new d.ComparisonFailure(d.Assert._formatMessage(f,"Value isn't an instance of expected type."),g,h);}},isNumber:function(g,f){d.Assert._increment();if(typeof g!="number"){throw new d.UnexpectedValue(d.Assert._formatMessage(f,"Value should be a number."),g);}},isObject:function(g,f){d.Assert._increment();if(!g||(typeof g!="object"&&typeof g!="function")){throw new d.UnexpectedValue(d.Assert._formatMessage(f,"Value should be an object."),g);}},isString:function(g,f){d.Assert._increment();if(typeof g!="string"){throw new d.UnexpectedValue(d.Assert._formatMessage(f,"Value should be a string."),g);}},isTypeOf:function(f,h,g){d.Assert._increment();if(typeof h!=f){throw new d.ComparisonFailure(d.Assert._formatMessage(g,"Value should be of type "+f+"."),f,typeof h);}},throwsError:function(i,j,h){d.Assert._increment();var f=false;try{j();}catch(g){if(typeof i=="string"){if(g.message!=i){f=true;}}else{if(typeof i=="function"){if(!(g instanceof i)){f=true;}}else{if(typeof i=="object"&&i!==null){if(!(g instanceof i.constructor)||g.message!=i.message){f=true;}}else{f=true;}}}if(f){throw new d.UnexpectedError(g);}else{return;}}throw new d.AssertionError(d.Assert._formatMessage(h,"Error should have been thrown."));}};d.AssertionError=function(f){this.message=f;this.name="Assert Error";};d.AssertionError.prototype={constructor:d.AssertionError,getMessage:function(){return this.message;},toString:function(){return this.name+": "+this.getMessage();}};d.ComparisonFailure=function(g,f,h){d.AssertionError.call(this,g);this.expected=f;this.actual=h;this.name="ComparisonFailure";};d.ComparisonFailure.prototype=new d.AssertionError;d.ComparisonFailure.prototype.constructor=d.ComparisonFailure;d.ComparisonFailure.prototype.getMessage=function(){return this.message+"\nExpected: "+this.expected+" ("+(typeof this.expected)+")"+"\nActual: "+this.actual+" ("+(typeof this.actual)+")";};d.CoverageFormat={JSON:function(f){return d.Util.JSON.stringify(f);},XdebugJSON:function(g){var f={};for(var h in g){if(g.hasOwnProperty(h)){f[h]=g[h].lines;}}return d.Util.JSON.stringify(g);}};d.DateAssert={datesAreEqual:function(g,i,f){d.Assert._increment();if(g instanceof Date&&i instanceof Date){var h="";if(g.getFullYear()!=i.getFullYear()){h="Years should be equal.";}if(g.getMonth()!=i.getMonth()){h="Months should be equal.";}if(g.getDate()!=i.getDate()){h="Days of month should be equal.";}if(h.length){throw new d.ComparisonFailure(d.Assert._formatMessage(f,h),g,i);}}else{throw new TypeError("YUITest.DateAssert.datesAreEqual(): Expected and actual values must be Date objects.");}},timesAreEqual:function(g,i,f){d.Assert._increment();if(g instanceof Date&&i instanceof Date){var h="";if(g.getHours()!=i.getHours()){h="Hours should be equal.";}if(g.getMinutes()!=i.getMinutes()){h="Minutes should be equal.";}if(g.getSeconds()!=i.getSeconds()){h="Seconds should be equal.";}if(h.length){throw new d.ComparisonFailure(d.Assert._formatMessage(f,h),g,i);}}else{throw new TypeError("YUITest.DateAssert.timesAreEqual(): Expected and actual values must be Date objects.");
}}};d.Mock=function(j){j=j||{};var g,h;try{function k(){}k.prototype=j;g=new k();}catch(i){g={};}for(h in j){if(j.hasOwnProperty(h)){if(typeof j[h]=="function"){g[h]=function(f){return function(){d.Assert.fail("Method "+f+"() was called but was not expected to be.");};}(h);}}}return g;};d.Mock.expect=function(l,g){if(!l.__expectations){l.__expectations={};}if(g.method){var f=g.method,m=g.args||[],o=g.returns,k=(typeof g.callCount=="number")?g.callCount:1,n=g.error,h=g.run||function(){},j;l.__expectations[f]=g;g.callCount=k;g.actualCallCount=0;for(j=0;j<m.length;j++){if(!(m[j] instanceof d.Mock.Value)){m[j]=d.Mock.Value(d.Assert.areSame,[m[j]],"Argument "+j+" of "+f+"() is incorrect.");}}if(k>0){l[f]=function(){try{g.actualCallCount++;d.Assert.areEqual(m.length,arguments.length,"Method "+f+"() passed incorrect number of arguments.");for(var r=0,p=m.length;r<p;r++){m[r].verify(arguments[r]);}h.apply(this,arguments);if(n){throw n;}}catch(q){d.TestRunner._handleError(q);}return o;};}else{l[f]=function(){try{d.Assert.fail("Method "+f+"() should not have been called.");}catch(i){d.TestRunner._handleError(i);}};}}else{if(g.property){l.__expectations[g.property]=g;}}};d.Mock.verify=function(f){try{for(var h in f.__expectations){if(f.__expectations.hasOwnProperty(h)){var g=f.__expectations[h];if(g.method){d.Assert.areEqual(g.callCount,g.actualCallCount,"Method "+g.method+"() wasn't called the expected number of times.");}else{if(g.property){d.Assert.areEqual(g.value,f[g.property],"Property "+g.property+" wasn't set to the correct value.");}}}}}catch(i){d.TestRunner._handleError(i);}};d.Mock.Value=function(h,f,g){if(this instanceof d.Mock.Value){this.verify=function(j){var i=[].concat(f||[]);i.push(j);i.push(g);h.apply(null,i);};}else{return new d.Mock.Value(h,f,g);}};d.Mock.Value.Any=d.Mock.Value(function(){});d.Mock.Value.Boolean=d.Mock.Value(d.Assert.isBoolean);d.Mock.Value.Number=d.Mock.Value(d.Assert.isNumber);d.Mock.Value.String=d.Mock.Value(d.Assert.isString);d.Mock.Value.Object=d.Mock.Value(d.Assert.isObject);d.Mock.Value.Function=d.Mock.Value(d.Assert.isFunction);d.ObjectAssert={areEqual:function(i,k,h){d.Assert._increment();var g=d.Object.keys(i),j=d.Object.keys(k);if(g.length!=j.length){d.Assert.fail(d.Assert._formatMessage(h,"Object should have "+g.length+" keys but has "+j.length));}for(var f in i){if(i.hasOwnProperty(f)){if(i[f]!=k[f]){throw new d.ComparisonFailure(d.Assert._formatMessage(h,"Values should be equal for property "+f),i[f],k[f]);}}}},hasKey:function(f,g,h){d.ObjectAssert.ownsOrInheritsKey(f,g,h);},hasKeys:function(g,f,h){d.ObjectAssert.ownsOrInheritsKeys(g,f,h);},inheritsKey:function(f,g,h){d.Assert._increment();if(!(f in g&&!g.hasOwnProperty(f))){d.Assert.fail(d.Assert._formatMessage(h,"Property '"+f+"' not found on object instance."));}},inheritsKeys:function(h,f,j){d.Assert._increment();for(var g=0;g<h.length;g++){if(!(propertyName in f&&!f.hasOwnProperty(h[g]))){d.Assert.fail(d.Assert._formatMessage(j,"Property '"+h[g]+"' not found on object instance."));}}},ownsKey:function(f,g,h){d.Assert._increment();if(!g.hasOwnProperty(f)){d.Assert.fail(d.Assert._formatMessage(h,"Property '"+f+"' not found on object instance."));}},ownsKeys:function(h,f,j){d.Assert._increment();for(var g=0;g<h.length;g++){if(!f.hasOwnProperty(h[g])){d.Assert.fail(d.Assert._formatMessage(j,"Property '"+h[g]+"' not found on object instance."));}}},ownsNoKeys:function(g,i){d.Assert._increment();var h=0,f;for(f in g){if(g.hasOwnProperty(f)){h++;}}if(h!==0){d.Assert.fail(d.Assert._formatMessage(i,"Object owns "+h+" properties but should own none."));}},ownsOrInheritsKey:function(f,g,h){d.Assert._increment();if(!(f in g)){d.Assert.fail(d.Assert._formatMessage(h,"Property '"+f+"' not found on object."));}},ownsOrInheritsKeys:function(h,f,j){d.Assert._increment();for(var g=0;g<h.length;g++){if(!(h[g] in f)){d.Assert.fail(d.Assert._formatMessage(j,"Property '"+h[g]+"' not found on object."));}}}};d.Results=function(f){this.name=f;this.passed=0;this.failed=0;this.errors=0;this.ignored=0;this.total=0;this.duration=0;};d.Results.prototype.include=function(f){this.passed+=f.passed;this.failed+=f.failed;this.ignored+=f.ignored;this.total+=f.total;this.errors+=f.errors;};d.ShouldError=function(f){d.AssertionError.call(this,f||"This test should have thrown an error but didn't.");this.name="ShouldError";};d.ShouldError.prototype=new d.AssertionError();d.ShouldError.prototype.constructor=d.ShouldError;d.ShouldFail=function(f){d.AssertionError.call(this,f||"This test should fail but didn't.");this.name="ShouldFail";};d.ShouldFail.prototype=new d.AssertionError();d.ShouldFail.prototype.constructor=d.ShouldFail;d.UnexpectedError=function(f){d.AssertionError.call(this,"Unexpected error: "+f.message);this.cause=f;this.name="UnexpectedError";this.stack=f.stack;};d.UnexpectedError.prototype=new d.AssertionError();d.UnexpectedError.prototype.constructor=d.UnexpectedError;d.UnexpectedValue=function(g,f){d.AssertionError.call(this,g);this.unexpected=f;this.name="UnexpectedValue";};d.UnexpectedValue.prototype=new d.AssertionError();d.UnexpectedValue.prototype.constructor=d.UnexpectedValue;d.UnexpectedValue.prototype.getMessage=function(){return this.message+"\nUnexpected: "+this.unexpected+" ("+(typeof this.unexpected)+") ";};d.Wait=function(g,f){this.segment=(typeof g=="function"?g:null);this.delay=(typeof f=="number"?f:0);};e.Test=d;e.Object.each(d,function(g,f){var f=f.replace("Test","");e.Test[f]=g;});e.Assert=d.Assert;e.Assert.Error=e.Test.AssertionError;e.Assert.ComparisonFailure=e.Test.ComparisonFailure;e.Assert.UnexpectedValue=e.Test.UnexpectedValue;e.Mock=e.Test.Mock;e.ObjectAssert=e.Test.ObjectAssert;e.ArrayAssert=e.Test.ArrayAssert;e.DateAssert=e.Test.DateAssert;e.Test.ResultsFormat=e.Test.TestFormat;e.assert=function(g,f){e.Assert._increment();if(!g){throw new e.Assert.Error(e.Assert._formatMessage(f,"Assertion failed."));}};e.fail=e.Assert.fail;var c=function(h){var g="";var f="";switch(h.type){case this.BEGIN_EVENT:g="Testing began at "+(new Date()).toString()+".";
f="info";break;case this.COMPLETE_EVENT:g=e.substitute("Testing completed at "+(new Date()).toString()+".\n"+"Passed:{passed} Failed:{failed} "+"Total:{total} ({ignored} ignored)",h.results);f="info";break;case this.TEST_FAIL_EVENT:g=h.testName+": failed.\n"+h.error.getMessage();f="fail";break;case this.TEST_IGNORE_EVENT:g=h.testName+": ignored.";f="ignore";break;case this.TEST_PASS_EVENT:g=h.testName+": passed.";f="pass";break;case this.TEST_SUITE_BEGIN_EVENT:g='Test suite "'+h.testSuite.name+'" started.';f="info";break;case this.TEST_SUITE_COMPLETE_EVENT:g=e.substitute('Test suite "'+h.testSuite.name+'" completed'+".\n"+"Passed:{passed} Failed:{failed} "+"Total:{total} ({ignored} ignored)",h.results);f="info";break;case this.TEST_CASE_BEGIN_EVENT:g='Test case "'+h.testCase.name+'" started.';f="info";break;case this.TEST_CASE_COMPLETE_EVENT:g=e.substitute('Test case "'+h.testCase.name+'" completed.\n'+"Passed:{passed} Failed:{failed} "+"Total:{total} ({ignored} ignored)",h.results);f="info";break;default:g="Unexpected event "+h.type;g="info";}if(e.Test.Runner._log){e.log(g,f,"TestRunner");}};var b,a;for(b in e.Test.Runner){a=e.Test.Runner[b];if(b.indexOf("_EVENT")>-1){e.Test.Runner.subscribe(a,c);}}e.Test.Runner.once=e.Test.Runner.subscribe;e.Test.Runner.disableLogging=function(){e.Test.Runner._log=false;};e.Test.Runner.enableLogging=function(){e.Test.Runner._log=true;};e.Test.Runner._ignoreEmpty=true;e.Test.Runner._log=true;e.Test.Runner.on=e.Test.Runner.attach;if(e.config.win){e.config.win.YUITest=d;}},"3.5.0",{requires:["event-simulate","event-custom","substitute","json-stringify"]});