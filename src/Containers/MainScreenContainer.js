import { connect } from 'react-redux'

import {
    resetGame
} from '../Redux/actions'

import MainScreen from '../Components/MainScreen'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        resetGame: () => {
            dispatch(resetGame())
          }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      state: state.state,
    }
  }

const MainScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainScreen)

export default MainScreenContainer;