// import Vue from 'vue';

const perObj = {
    name: true,
    age: true,
    id: false,
}

const xixi = 77;

export function directives(app) {
    app.directive('permit', {
        
        mounted(el, binding) {
            console.log(binding, 'binding');
            perObj[binding.value] ? {} : el.parentNode.removeChild(el);
        }
    })
}