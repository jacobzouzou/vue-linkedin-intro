# Vue
[Get vue cdn](https://www.jsdelivr.com)  
[Vue org](https://vuejs.org)  
[Bootstrap](https://getbootstrap.com)  
[Nasa API](https://api.nasa.gov)  
[axios](https://github.com/axios)

# Single file component
    install node.js: download and install
    install vue-cli: npm -g install vue
    create project : vue create project_name

install sass loader to use scss file 

    npm install sass-loader sass webpack --save-dev

Production:

    npm run build
    
install intellisense for CSS class name in HTML extension

Example of transition

    <h2 class="card-header">Near earth
        <transition name="spin" appear>
            <span style="display:inline-block">objects</span>
        </transition>
    </h2>