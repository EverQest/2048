 render() {
    return (
      <div>        
        <div className="button" onClick={() => {this.initBoard()}}>Новая игра</div>
                
        <table>
          {this.state.board.map((row, i) => (<Row key={i} row={row} />))}
        </table>
        
        <p>{this.state.message}</p>
      </div>
    );
  }