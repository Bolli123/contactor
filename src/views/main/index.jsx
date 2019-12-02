import React from 'react';
import { View, Text } from 'react-native';
import Toolbar from '../../components/Toolbar';
import BoardList from '../../components/boardlist';
import AddModal from '../../components/AddModal';
import styles from '../../views/main/styles'
import { addImage, getAllBoards } from '../../services/fileService';
import { takePhoto, selectFromCameraRoll } from '../../services/imageService';
import { connect } from 'react-redux'
import { actionAddBoard, actionDeleteBoards } from '../../actions/boardActions'

class Main extends React.Component {
  state = {
    boards: this.props.boards,
    selectedBoards: [],
    isAddModalOpen: false,
    loadingBoards: false,
    boardName: '',
    newBoardId: 0,
    newPhoto: ''
  }
  async componentDidMount() {
    const { boards } = this.state
    const newId = boards[boards.length-1].id + 1
    this.setState( {newBoardId: newId} )
  }
  onBoardLongPress(id) {
    const { selectedBoards } = this.state;
    if (selectedBoards.indexOf(id) !== -1) {
      // board is already in the list
      this.setState({
        selectedBoards: selectedBoards.filter(board => board !== id)
      });
    } else {
      //add board
      this.setState({
        selectedBoards: [ ...selectedBoards, id ]
      });
    }
  }
  async takePhoto() {
    const photo = await takePhoto();
    if (photo.length > 0) {
      this.setState({newPhoto: photo})
    }
  }
  async selectFromCameraRoll() {
    const photo = await selectFromCameraRoll();
    if (photo.length > 0) {
      this.setState({newPhoto: photo})
    }
}
deleteSelected() {
  const { selectedBoards, boards} = this.state
  const retBoards = []
  for (const [index, value] of boards.entries()) {
  if (!selectedBoards.includes(value.id)) {
      retBoards.push(value)
    }
  }
  this.setState({
    boards: retBoards,
    selectedBoards: []
  })
  const { actionDeleteBoards } = this.props;
  actionDeleteBoards(retBoards)
}
  setBoardName(name) {
      this.setState({boardName: name})
  }

  async addBoard(image, name) {
    const { boardName, newPhoto, newBoardId, boards } = this.state
    if (boardName === '' || newPhoto === '') {
      return
    }
    const newBoard = {
      id: newBoardId,
      name: boardName,
      thumbnailPhoto: newPhoto
    }
    this.setState({
      boards: [ ...boards, newBoard ],
      isAddModalOpen: false,
      newPhoto: '',
      boardName: ''
    })
    this.setState({ newBoardId: newBoardId + 1 })
    const { actionAddBoard } = this.props;
    actionAddBoard(newBoardId, boardName, newPhoto)
  }

  displayCaption() {
    const { selectedBoards } = this.state;
    if (selectedBoards.length == 0) {
      return;
    }
    let itemCaption = 'boards';
    if (selectedBoards.length === 1) {
      itemCaption = 'board'
    }
    return <Text style={styles.selectedText}> {selectedBoards.length} {itemCaption} selected </Text>
  }
  render() {
    const { selectedBoards, boards, isAddModalOpen, boardName } = this.state;
    return (
      <View style={{ flex: 1}}>
        <Toolbar
          hasSelectedImages={selectedBoards.length > 0}
          onAdd={() => this.setState({ isAddModalOpen: true})}
          onRemove={() => this.deleteSelected()}
          pagename ={'Boards'}
        />
        <BoardList
          onLongPress={(id) => this.onBoardLongPress(id)}
          boards={ boards }
          selectedBoards={selectedBoards}/>
          <View style={styles.block_counter}>
          {this.displayCaption()}
          </View>
        <AddModal
          isOpen={isAddModalOpen}
          closeModal={() => this.setState({
            isAddModalOpen: false ,
            newPhoto: '',
            boardName: ''
          })}
          takePhoto={() => this.takePhoto()}
          selectFromCameraRoll={() => this.selectFromCameraRoll()}
          addBoard={() => this.addBoard()}
          boardName={(name) => this.setBoardName(name)}
         />
      </View>
    )
  }
}

const mapStateToProps = reduxStoreState => {
  return {boards: reduxStoreState.board}
}

export default connect(mapStateToProps, { actionAddBoard, actionDeleteBoards })(Main); // Returns a connected component
