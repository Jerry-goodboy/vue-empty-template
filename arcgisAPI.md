1. 获取属性直接用get方法，会进行对象是否为空的判断
```
var basemapTitle = map.get("basemap.title");
```
2. 多个属性设置直接用set方法，利用对象进行赋值
```
var viewProperties = {
  center: [ -100, 40 ],
  zoom: 6
};
view.set(viewProperties);
```
3. 监听一个集合属性的变化
```
// Creates a new Map with a 'streets' basemap
var map = new Map({
  basemap: 'streets'
});

// watch handler: the callback fires each time the title of the map's basemap changes
var handle = map.watch('basemap.title', function(newValue, oldValue, property, object) {
  console.log("New value: ", newValue,      // The new value of the property
              "<br>Old value: ", oldValue,  // The previous value of the changed property
              "<br>Watched property: ", property,  // In this example this value will always be "basemap.title"
              "<br>Watched object: ", object);     // In this example this value will always be the map object
});
```
```
Not all properties can be watched. This is true for any property of type Collection. Instead of watching, developers can register an event handler to be notified of changes to the collection. See the change event documentation for more details.
```
2. 多个属性设置直接用set方法，利用对象进行赋值
```
var viewProperties = {
  center: [ -100, 40 ],
  zoom: 6
};
view.set(viewProperties);
```
2. 多个属性设置直接用set方法，利用对象进行赋值
```
var viewProperties = {
  center: [ -100, 40 ],
  zoom: 6
};
view.set(viewProperties);
```
2. 多个属性设置直接用set方法，利用对象进行赋值
```
var viewProperties = {
  center: [ -100, 40 ],
  zoom: 6
};
view.set(viewProperties);
```
2. 多个属性设置直接用set方法，利用对象进行赋值
```
var viewProperties = {
  center: [ -100, 40 ],
  zoom: 6
};
view.set(viewProperties);
```
2. 多个属性设置直接用set方法，利用对象进行赋值
```
var viewProperties = {
  center: [ -100, 40 ],
  zoom: 6
};
view.set(viewProperties);
```
2. 多个属性设置直接用set方法，利用对象进行赋值
```
var viewProperties = {
  center: [ -100, 40 ],
  zoom: 6
};
view.set(viewProperties);
```
2. 多个属性设置直接用set方法，利用对象进行赋值
```
var viewProperties = {
  center: [ -100, 40 ],
  zoom: 6
};
view.set(viewProperties);
```
