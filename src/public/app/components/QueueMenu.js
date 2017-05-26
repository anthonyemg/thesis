import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  showQueueMenu: state.showQueueMenu,
})

const mapDispatchToProps = dispatch => ({
  hideQueueMenuEvent: () => dispatch({ type: 'HIDE_QUEUE_MENU' }),
})

const QueueMenu = ({ showQueueMenu }) => {
  let songTestList = [
    {
      Artist: 'Bob',
      SongName: 'Song 1',
      Time: '2:21',
      key: 1
    },
    {
      Artist: 'Ashley',
      SongName: 'Song 2',
      Time: '3:11',
      key: 2,
    },
    {
      Artist: 'Rob',
      SongName: 'Song 3',
      Time: '10:21',
      key: 3
    },

  ];
  return (
    <div className="QueueMenu" style={{ display: showQueueMenu ? "block" : "none" }}>
      {songTestList.map((song, idx) => (
        <div className="IndividualSong" key={song.key}>
          <span>{idx+1}</span>
          <span>{song.Artist}</span>
          <span>{song.SongName}</span>
          <span>{song.Time}</span>
        </div>
      ))}
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(QueueMenu);
