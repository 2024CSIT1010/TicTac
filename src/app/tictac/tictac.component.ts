import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tictac',
  templateUrl: './tictac.component.html',
  styleUrl: './tictac.component.css'
})
export class TictacComponent  implements OnInit{
  ngOnInit(): void {
    let allcell=localStorage.getItem('allCells');
    this.cells=allcell?JSON.parse(allcell):Array(10).fill(null);
    let allmove=localStorage.getItem('allmoves');
    this.allMoves=allmove?JSON.parse(allmove):[];   
  }
  PlayerA:Player=new Player("PlayerA",'X',true,false);
  PlayerB:Player=new Player("PlayerB",'O',false,false);
  cells:string[]=Array(10).fill(null);
  gameStatus:string="gameActive";
  
  allMoves:string[]=[];
  winGrid:number[]=[];

  update(Label:string)
  {
    if(Label=='A')
      {
        this.PlayerA.isedit=!this.PlayerA.isedit;
      }
      if(Label=='B'){
        this.PlayerB.isedit=!this.PlayerB.isedit
      }
  }
  makemove(ind:number)
  {  if(this.cells[ind]!=null)
    {
      return;
    }
      if (this.gameStatus !== "gameActive") {
      return;
    }
    const player=this.PlayerA.isTurn?this.PlayerA:this.PlayerB;
    this.cells[ind]=player.symbol;
    

    if(this.allMoves.length<5)
    {
    this.allMoves.push(player.name+ "plays" + player.symbol+" at" +ind);
    }
    else
    {
      this.allMoves.shift();
      this.allMoves.push(player.name+ "plays" + player.symbol+" at" +ind);
    }
     localStorage.setItem("allCells",JSON.stringify(this.cells));
     localStorage.setItem('allmoves',JSON.stringify(this.allMoves));
    let x=this.checkGame();
    if(x==1)
    {
      this.PlayerA.isTurn=false;
      this.PlayerB.isTurn=false;
    }
    else{
    this.PlayerA.isTurn=!this.PlayerA.isTurn;
    this.PlayerB.isTurn=!this.PlayerB.isTurn;
    }
  }
  checkGame()
  {
    const player=this.PlayerA.isTurn?this.PlayerA:this.PlayerB;
    const win=[
      [1,2,3],[4,5,6],[7,8,9],
      [1,4,7],[2,5,8],[3,6,9],
      [1,5,9],[3,5,7]

    ];
    for (let comb of win)
      {
        let [a,b,c]=comb;
        if(this.cells[a]==player.symbol && this.cells[b]==player.symbol && this.cells[c]==player.symbol)
          {
            this.gameStatus=player.name+ "WIN";
           this.winGrid=comb;
            return 1;
          }
      }
      let isdraw=true;
      for(let i=1;i<10;i++)
        {
          if(this.cells[i]==null)
            {
              isdraw=false;
              break;
            }

        }
        if(isdraw)
          {
            this.gameStatus="DRAW";
            return 1;
          }
      return 0;
  }
reset()
{
   this.cells=Array(10).fill(null);
   this.allMoves=[];
   this.gameStatus='gameActive';
   this.PlayerA.isTurn=true;
   this.PlayerB.isTurn=false;
   this.winGrid=[];
   localStorage.clear();
}

}

class Player{
  name:string;
  symbol:string;
  isTurn:boolean;
  isedit:boolean;
  constructor(name:string,symbol:string,turn:boolean,isedit:boolean)
  {
    this.name=name;
    this.symbol=symbol;
    this.isTurn=turn;
    this.isedit=isedit;
  }

}
