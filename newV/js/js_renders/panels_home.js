"use strict";

var ContentPanels  = React.createClass({displayName: 'ContentBoxPanels',

    loadPanelsFromServer: function() {
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
        this.loadPanelsFromServer();
    },

    //agrega jquery custom
    componentDidUpdate:function(){

    },

    render: function() {
        return (
            React.createElement("div", {className: "contentBoxPanel"},
                React.createElement(list_panel, {data: this.state.data})

            )
        );
    }

});

var list_panel = React.createClass({displayName: 'list_panel',
    render: function() {
        var PanelText = this.props.data.map(function (data) {
            return (
                React.createElement(Panels, {title_panel:data.title,body_panel:data.body,image_svg:data.field_image})
            );
        });
        return (
            React.createElement("div", {className: "list_panel"},
                PanelText
            )
        );
    }

});

//estructura final html
var Panels = React.createClass({displayName: 'Panels',
    render: function() {
        return (
            React.createElement("div", {className: "fh5co-block to-animate"},
                React.createElement("div", {className: "overlay-darker"}),
                React.createElement("div", {className: "overlay"}),
                React.createElement("div", {className: "fh5co-text"},
                    React.createElement("i", {className: "fh5co-intro-icon "+this.props.image_svg}),
                    React.createElement("h2", {className:""},this.props.title_panel),
                    React.createElement("p", {dangerouslySetInnerHTML: {__html: this.props.body_panel}})

                )



            )
        );
    }
});

// Render our reactComponent
ReactDOM.render(
    React.createElement(ContentPanels, {url: "json_file/panels.json"}),
    document.getElementById('Panels_home')
);
