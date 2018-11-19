<template>
    <div class="container-fluid">
        <div class="row">
            <div class="container">
                <div class="row">
                    <div class="col-3"></div>
                    <div class="col-6 text-center">
                        <h3>Welcome to Notes Master 3000</h3>
                    </div>
                    <div class="col-3"></div>
                </div><br/>
                <div class="row" id="cloudStorageOptionContainer">
                    <div class="col-4"></div>
                    <div class="col-4 text-center">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text" id="useCloudCheckbox">
                                    <input type="checkbox" v-model="cloud.enabled" id="cloudSwitch" v-on:change="handleCloudEnablementSwitch">
                                </div>
                                <label for="useCloudCheckbox">
                                    Use public cloud storage to save your data? <br/>
                                    (overwrites current data, you can still use the backup feature)
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col-4"></div>
                </div>
                <div class="row notesManagementMenu">
                    <div class="col-1"></div>
                    <div class="col-10">
                        <div class="container">
                            <div class="row">
                                <div class="col-6 text-center" id="dragDropInfo">
                                    <h6>Load notes data from a notes backup file (overwrites current data)</h6>
                                    <span class="text-success" style="display: none">Data loaded</span>
                                    <span class="text-danger" style="display: none">Invalid data in file</span>
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="loadBackupFileInput" v-on:change="handleLoadBackup">
                                            <label class="custom-file-label" for="loadBackupFileInput">Choose file</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 text-center">
                                    <button type="button" class=" btn btn-outline-primary" id="backupBtn" v-on:click="handleSaveBackup">
                                        Save locally a backup of your notes
                                    </button>
                                </div>
                            </div><br/><br/>
                            <div class="row">
                                <div class="col-xl-4 col-md-3"></div>
                                <div class="col-xl-4 col-md-6">
                                    <div class="btn btn-success btn-block" id="createNoteBtn" data-toggle="collapse" data-target="#createNoteContainer" aria-expanded="false" aria-controls="createNoteContainer">
                                        <table>
                                            <tr>
                                                <td>
                                                    <i class="fa fa-sticky-note-o"></i>
                                                </td>
                                                <td>
                                                    Create a note
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-md-3"></div>
                            </div>
                            <hr>
                            <div class="row collapse" id="createNoteContainer">
                                <div class="col-12">
                                    <form>
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Note</span>
                                            </div>
                                            <textarea class="form-control" aria-label="Note" rows="5" v-model="createNoteForm.command.note" v-bind:style="{backgroundColor: createNoteForm.command.backgroundColor, color: createNoteForm.command.textColor}"></textarea>
                                            <div class="inputFeedback text-danger" v-show="createNoteForm.noteFieldNotice != null">
                                                {{createNoteForm.noteFieldNotice}}
                                            </div>
                                        </div>
                                        <br/>
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="colorInputInfo">Chose text color</span>
                                            </div>
                                            <input type="color" class="form-control" aria-describedby="colorInputInfo" v-model="createNoteForm.command.textColor" v-on:click="handleColorPickerChangeColor"/>
                                        </div><br/>
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="colorInputInfo">Chose background color</span>
                                            </div>
                                            <input type="color" class="form-control" aria-describedby="colorInputInfo" v-model="createNoteForm.command.backgroundColor" v-on:click="handleColorPickerChangeColor"/>
                                        </div>
                                    </form><br/>
                                    <span v-show="notesData.savedStyles.length > 0">
                                        Saved styles : 
                                    </span>
                                    <span v-show="notesData.savedStyles.length === 0">
                                        No saved styles
                                    </span><br/>
                                    <form class="form-inline">
                                        <div class="input-group" v-for="(style, index) in notesData.savedStyles">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">
                                                    <input type="radio" v-model="createNoteForm.selectedSavedStyle" v-bind:value="index" v-on:click="handlePickStyle(index)">
                                                </div>
                                            </div>
                                            <div class="savedColorContainer" v-bind:style="{color: style.textColor, backgroundColor: style.backgroundColor}">
                                                Style #{{index + 1}}
                                            </div>
                                        </div>
                                    </form><br/>
                                    <div class="container">
                                        <div class="row">
                                            <button class="col-12 btn btn-success float-right" v-on:click="handleCreateNote">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                            </div>
                        </div>
                    </div>
                    <div class="col-1"></div>
                </div>
                <div class="row">
                    <div class="col-2 col-sm-3 col-lg-4 col-md-3"></div>
                    <div class="col-8 col-sm-6 col-lg-4 col-md-6 text-center">
                        <table style="margin: 0 auto">
                            <tr>
                                <td>
                                    <span> Select a note and ... </span>
                                </td>
                                <td>
                                    <button class="btn btn-outline-secondary" type="button"  data-toggle="collapse" href="#editNoteContainer" aria-expanded="false" aria-controls="editNoteContainer">
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <span> or </span>
                                </td>
                                <td>
                                    <button class="btn btn-outline-secondary" type="button" v-on:click="handleRemoveSelectedNote">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-2 col-sm-3 col-lg-4 col-md-3"></div>
                </div><hr>
                <div class="row">
                    <div class="col-1"></div>
                    <div class="col-10 collapse"  id="editNoteContainer">
                        <form v-if="selectedNoteIndex !== null">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Note</span>
                                </div>
                                <textarea class="form-control" aria-label="Note" rows="5" v-model="editNoteForm.command.note" v-bind:style="{color: notesData.notes[selectedNoteIndex].textColor, backgroundColor: notesData.notes[selectedNoteIndex].backgroundColor}"></textarea>
                                <div class="editFeedback text-danger" v-show="editNoteForm.noteFieldNotice != null">
                                    {{editNoteForm.noteFieldNotice}}
                                </div>
                            </div><br/>
                            <button class="btn btn-outline-secondary btn-block" v-on:click="handleEditSelectedNote">Edit</button>
                        </form>
                        <div v-if="selectedNoteIndex === null" class="text-center">
                            
                            To edit a note, please select one first
                            <br/><br/>
                        </div>
                    </div>
                    <div class="col-1"></div>
                </div>
                <div class="row">
                    <div class="col-1"></div>
                    <div class="col-10 text-center">
                        <table style="margin: 0 auto">
                            <tr>
                                <td>
                                    Filter notes by style : 
                                </td>
                                <td>
                                    <button class="btn btn-outline-secondary resetFilterBtn" type="button" v-on:click="filterNotes('*')">
                                        Reset
                                    </button>
                                </td>
                                <td v-for="style in notesData.savedStyles">
                                    <button class="btn filterBtn" v-bind:style="{color: style.textColor, backgroundColor: style.backgroundColor}" v-on:click="filterNotes(style.textColor, style.backgroundColor, $event)">txt</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-1"></div>
                </div><hr>
                <div class="row">
                    <div class="col-1"></div>
                    <div class="col-10" id="notesListContainer">
                        <div class="grid">
                            <div class="gridItem" v-for="(note, index) in sortedNotes" v-bind:style="{color: note.textColor, backgroundColor: note.backgroundColor}" v-on:click="selectNote" v-bind:noteIndex="index" v-bind:datatimestamp="note.timestamp">
                                <div class="noteText">
                                    {{note.note}}
                                </div>
                                <div class="noteDate">
                                    {{note.timestamp | date}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-1"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import isotope from 'isotope-layout';
import cookies from 'js-cookie';

export default {
    data: function() {
        return {
            notesData: {
                savedStyles: [
                    //{textColor: '#000000', backgroundColor: '#ffff99'}
                ],
                notes: [/*{
                    note: null,
                    textColor: '#000000',
                    backgroundColor: '#ffff99',
                    timestamp: null
                }*/]
            },
            createNoteForm: {
                noteFieldNotice: null,
                selectedSavedStyle: null,
                isHandling: false,
                command: {
                    note: null,
                    textColor: '#000000',
                    backgroundColor: '#ffff99',
                    timestamp: null
                }
            },
            selectedNoteIndex: null,
            editNoteForm: {
                noteFieldNotice: null,
                command: {
                    note: null
                }
            },
            isotope: null,
            cloud: {
                enabled: true,
                repositoryId: null
            }
        };
    },
    computed: {
        sortedNotes: function() {
            return this.notesData.notes.sort((a, b) => { return b.timestamp - a.timestamp;});
        }
    },
    created: function() {
        if(cookies.get('cloudEnabled') === 'y') {
            this.cloud.enabled = true;
        }
        else if(cookies.get('cloudEnabled') === 'n') {
            this.cloud.enabled = false;
        }
        else {
            this.cloud.enabled = true;
            cookies.set('cloudEnabled', 'y', { expires: 365 });
        }
        
        if(cookies.get('repositoryId') != null) {
            this.cloud.repositoryId = cookies.get('repositoryId');
            
            if(this.cloud.enabled) {
                $.ajax('//api.jsonbin.io/b/' + this.cloud.repositoryId + '/latest').then(notesData => {
                    this.notesData = notesData;
                }, () => {
                    alert('Could not load data from cloud. Cloud save feature may not work properly. Disabling feature');
                    $('#cloudSwitch').prop('disabled', true);
                    this.cloud.enabled = false;
                });
            }
        }
        else {
            $.ajax('//api.jsonbin.io/b',{
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                data: JSON.stringify(this.notesData)
            }).then((responseData) => {
                if(responseData.success && responseData.success === true
                        && responseData.id && typeof responseData.id === 'string') {
                    cookies.set('repositoryId', responseData.id, { expires: 365 });
                    this.cloud.repositoryId = responseData.id;
                }
                else {
                    alert('Could not init data on cloud. Cloud save feature may not work properly. Disabling feature.');
                    $('#cloudSwitch').prop('disabled', true);
                    this.cloud.enabled = false;
                }
            }, () => {
                alert('Could not init data on cloud. Cloud save feature may not work properly. Disabling feature.');
                $('#cloudSwitch').prop('disabled', true);
                this.cloud.enabled = false;
            });
        }
    },
    updated: function(){
        this.isotope = new isotope('.grid', {
            itemSelector: '.gridItem',
            layoutMode: 'masonry',
            masonry: {
                gutter: 3
            }
        });
    },
    methods: {
        handleCloudEnablementSwitch: function() {
            if(this.cloud.enabled) {
                $.ajax('//api.jsonbin.io/b/' + this.cloud.repositoryId + '/latest').then(notesData => {
                    this.notesData = notesData;
                },() => {
                    alert('Could not load data from cloud. Cloud save feature may not work properly. Disabling feature');
                    $('#cloudSwitch').prop('disabled', true);
                    this.cloud.enabled = false;
                });
            }
            
            cookies.set('cloudEnabled', this.cloud.enabled ? 'y' : 'n', { expires: 365 });
        },
        filterNotes: function(textColor, backgroundColor, event) {
            if(textColor === '*') {
                this.isotope.arrange({
                    filter: '*'
                });
                return;
            }
            
            this.isotope.arrange({
                filter: function(nothing, noteElem) {
                    function rgb2hex(rgb) {
                        if (  rgb.search("rgb") == -1 ) {
                             return rgb;
                        } else {
                             rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
                             function hex(x) {
                                  return ("0" + parseInt(x).toString(16)).slice(-2);
                             }
                             return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
                        }
                   }
                    
                    if(rgb2hex($(noteElem).css('color')) === textColor 
                            && rgb2hex($(noteElem).css('background-color')) === backgroundColor) {
                        return true;
                    }
                    
                    return false;
                }
            });
        },
        handleSaveBackup: function() {
            var data = JSON.stringify(this.notesData);
            
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
            element.setAttribute('download', 'notes-master-3000-backup.json');

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        },
        handleLoadBackup: function(event) {
            if(!$(event.currentTarget)[0].files || !$(event.currentTarget)[0].files[0]) {
                return;
            }
            
            var file = $(event.currentTarget)[0].files[0];
            this.loadDataFromFile(file);
            
            var fileName = $(event.currentTarget).val().split('\\').pop();
            
            $('.custom-file-label').text(fileName);
        },
        loadDataFromFile: function(file) {
            var fileReader = new FileReader();
            
            fileReader.onload = () => {
                try {
                    var notesData = JSON.parse(fileReader.result);
                } catch(e) {
                    $('#dragDropInfo .text-danger').show().delay(5000).fadeOut();
                    return;
                }
                
                if(!this.isNotesDataValid(notesData)) {
                    $('#dragDropInfo .text-danger').show().delay(5000).fadeOut();
                    return;
                }
                
                this.notesData = notesData;
                
                $.ajax('//api.jsonbin.io/b/' + this.cloud.repositoryId,{
                    method: 'PUT',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    data: JSON.stringify(notesData)
                }).then(() => {
                    
                }, () => {
                    alert('Failed to sync with the clould from the loaded backup.');
                });
                
                $('#dragDropInfo .text-success').show().delay(5000).fadeOut();
            };
            
            fileReader.readAsText(file);
        },
        isNotesDataValid: function(notesData) {
            if(!notesData.savedStyles || !notesData.notes) {
                return false;
            }
            
            for(var i = 0; i < notesData.savedStyles.length; i++) {
                if(!notesData.savedStyles[i].textColor || !notesData.savedStyles[i].backgroundColor
                        || typeof notesData.savedStyles[i].textColor !== 'string'
                        || typeof notesData.savedStyles[i].backgroundColor !== 'string') {
                    return false;
                }
            }
            
            for(var i = 0; i < notesData.notes.length; i++) {
                if(!notesData.notes[i].textColor || !notesData.notes[i].backgroundColor
                        || !notesData.notes[i].note || !notesData.notes[i].timestamp
                        || typeof notesData.notes[i].textColor !== 'string'
                        || typeof notesData.notes[i].backgroundColor !== 'string'
                        || typeof notesData.notes[i].note !== 'string'
                        || !$.isNumeric(notesData.notes[i].timestamp)) {
                    return false;
                }
            }
            
            return true;
        },
        handleEditSelectedNote: function(event) {
            event.preventDefault();
            
            var notesDataCopy = JSON.parse(JSON.stringify(this.notesData));
            
            notesDataCopy.notes[this.selectedNoteIndex].note = this.editNoteForm.command.note;
            
            if(!this.cloud.enabled) {
                this.notesData = notesDataCopy;
                return;
            }
            
            $.ajax('//api.jsonbin.io/b/' + this.cloud.repositoryId,{
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json'
                },
                data: JSON.stringify(notesDataCopy)
            }).then(() => {
                this.notesData = notesDataCopy;
            }, () => {
            });
        },
        handleRemoveSelectedNote: function() {
            var notesDataCopy = JSON.parse(JSON.stringify(this.notesData));
            
            notesDataCopy.notes.splice(this.selectedNoteIndex, 1);
            
            if(!this.cloud.enabled) {
                $('.gridItem').removeClass('selected');
                this.selectedNoteIndex = null;
                this.notesData.notes = [];
                this.notesData.notes.push(... notesDataCopy.notes);
                return;
            }
            
            $.ajax('//api.jsonbin.io/b/' + this.cloud.repositoryId,{
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json'
                },
                data: JSON.stringify(notesDataCopy)
            }).then(() => {
                $('.gridItem').removeClass('selected');
                this.selectedNoteIndex = null;
                this.notesData.notes = [];
                this.notesData.notes.push(... notesDataCopy.notes);
            }, () => {
            });
        },
        selectNote: function(event) {
            event.stopPropagation();
            
            if($(event.currentTarget).hasClass('selected')) {
                $('.gridItem').removeClass('selected');
                this.selectedNoteIndex = null;
                this.editNoteForm.command.note = null;
                return;
            }
            
            $('.gridItem').removeClass('selected');
            $(event.currentTarget).addClass('selected');
            this.selectedNoteIndex = parseInt($(event.currentTarget).attr('noteIndex'));
            this.editNoteForm.command.note = this.notesData.notes[this.selectedNoteIndex].note;
        },
        handlePickStyle: function(styleIndex) {
            this.createNoteForm.command.textColor = this.notesData.savedStyles[styleIndex].textColor;
            this.createNoteForm.command.backgroundColor 
                    = this.notesData.savedStyles[styleIndex].backgroundColor;
        },
        handleColorPickerChangeColor: function() {
            $('input[type="radio"]').prop('checked', false); 
        },
        handleCreateNote: function(event) {
            event.preventDefault();
            
            this.createNoteForm.isHandling = true;
            
            var styleAlreadySaved = false;
            for(var i = 0; i < this.notesData.savedStyles.length; i++) {
                if(this.notesData.savedStyles[i].textColor === this.createNoteForm.command.textColor
                        && this.notesData.savedStyles[i].backgroundColor 
                        === this.createNoteForm.command.backgroundColor) {
                    styleAlreadySaved = true;
                    break;
                }
            }
            
            if(!styleAlreadySaved) {
                this.notesData.savedStyles.push({
                    textColor: this.createNoteForm.command.textColor, 
                    backgroundColor: this.createNoteForm.command.backgroundColor
                });
            }
            
            this.createNoteForm.command.timestamp = new Date().getTime();
            
            var notesDataCopy = JSON.parse(JSON.stringify(this.notesData));
            var commandCopy = JSON.parse(JSON.stringify(this.createNoteForm.command));
            
            notesDataCopy.notes.push(commandCopy);
            
            if(!this.cloud.enabled) {
                this.notesData = notesDataCopy;
                this.createNoteForm.isHandling = false;
                return;
            }
            
            $.ajax('//api.jsonbin.io/b/' + this.cloud.repositoryId,{
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json'
                },
                data: JSON.stringify(notesDataCopy)
            }).then(() => {
                this.notesData = notesDataCopy;
                this.createNoteForm.isHandling = false;
            }, () => {
                this.createNoteForm.isHandling = false;
            });
        }
    },
    filters: {
        date: function(timestamp) {
            var date = new Date(timestamp);

            return date.toUTCString();
        }
    }
}
</script>

<style>
    body {
        background-color: rgb(249, 249, 255);
    }
</style>

<style scoped>
    #cloudStorageOptionContainer label {
        padding-left: 30px;
    }
    
    #backupBtn {
        white-space: normal;
        width: 100%;
        height: 100%;
        border-style: dashed;
    }
    
    .container-fluid {
        padding-top: 10px;
        font-size: 14px;
    }
    
    h3 {
        letter-spacing: 2px;
        margin: 0;
    }
    
    .notesManagementMenu {
        margin-top: 50px;
    }
    
    #dragDropInfo {
        color: #bdbdbd;
        padding: 20px;
        border: 1px dashed #cccccc;
    }
    
    .fa-sticky-note-o {
        color: white;
    }
    
    #createNoteBtn {
        width: 80%;
        margin: 0 auto;
    }
    
    #createNoteBtn table {
        width: 100%;
    }
    
    #createNoteBtn td {
        padding: 3px;
        white-space: normal;
        text-align: center;
    }
    
    input[type="color"] {
        height: 40px;
    }
    
    .savedColorContainer {
        padding: 10px; 
        border: 1px solid #cccccc; 
        letter-spacing: 2px
    }
    
    .gridItem {
        border: 2px solid #bdbdbd;
        text-align: center;
        cursor: pointer;
        margin-bottom: 3px;
        overflow: hidden;
    }
    
    @media screen and (min-width: 800px) {
        .gridItem {
            width: 23%;
        }
    }
    
    @media screen and (max-width: 800px) and (min-width: 500px) {
        .gridItem {
            width: 45%;
        }
    }
    
    @media screen and (max-width: 500px) {
        .gridItem {
            width: 100%;
        }
    }
    
    .noteText {
        padding: 10px;
    }
    
    .noteDate {
        text-align: right;
        padding: 10px 10px 0 0;
        font-size: 75%;
    }
    
    .gridItem.selected, .gridItem:hover {
        box-shadow: 0 0 7px 3px rgba(81, 203, 238, 99);
    }
    
    .resetFilterBtn {
        height: 50px;
    }
    
    .filterBtn {
        height: 50px;
        width: 50px;
    }
</style>
