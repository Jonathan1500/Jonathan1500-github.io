"use strict";

var ContentProject  = React.createClass({displayName: 'ContentBoxProject',

    loadProjectFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    getInitialState: function() {
        return {data: []};
    },

    componentDidMount: function() {
        this.loadProjectFromServer();
    },

    //agrega jquery custom
    componentDidUpdate:function(){

    },

    render: function() {
        return (
            React.createElement("div", {className: "contentBoxProject"},
                React.createElement(list_project, {data: this.state.data})

            )
        );
    }

});

var list_project = React.createClass({displayName: 'list_project',
    render: function() {
        var ProjectText = this.props.data.map(function (data) {
            return (
                React.createElement(Project, {title_project:data.title,body_project:data.body,image_project:data.field_image_project,urlsite:data.url_site})
            );
        });
        return (
            React.createElement("div", {className: "list_project"},
                ProjectText
            )
        );
    }

});

//estructura final html
var Project = React.createClass({displayName: 'Project',
    render: function() {
        return (
            React.createElement("div", {className: "col-md-4 col-sm-6 col-xxs-12"},
                React.createElement("a",{className:'fh5co-project-item image-popup to-animate',target:'_blank',href: this.props.urlsite},
                    React.createElement("img", {className: "img-responsive",src: this.props.image_project}),
                    //create div fh50co-text
                    React.createElement("div",{className:'fh5co-text'},
                        React.createElement('h2',{className:''},this.props.title_project),
                        React.createElement('span',{className:'',dangerouslySetInnerHTML: {__html: this.props.body_project}})
                    )

                )
            )///end div col-md-4




        );
    }
});

// Render our reactComponent
ReactDOM.render(
    React.createElement(ContentProject, {url: "json_file/projects.json"}),
    document.getElementById('ListProjects')
);
