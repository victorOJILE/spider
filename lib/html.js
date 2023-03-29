//document.getElementById('root').insertAdjacentHTML();
  /* 
   <div class="dropdown">
        <input type="text" name="fontFamily" class="my-input" value="Arial" />
        <div class="dropdown-content maxH main-list">
         <ul class="fontsList">
         </ul>
        </div>
       </div>
       <div class="flex jc-cent">
        <div class="dropdown">
         <input type="text" class="my-input small-input1" name="fontSize" placeholder="FS" />
         <div class="dropdown-content maxH main-list" style="width: 50px">
          <ul class="fontNumberList">
          </ul>
         </div>
        </div>
        <div class="dropdown mr-1">
         <input type="text" value="px" class="my-input small-input1 small-input2" name="fontSize" disabled />
         <div class="dropdown-content maxH main-list" style="width: 50px">
          <ul class="unitList">
          </ul>
         </div>
        </div>
        <div class="dropdown">
         <input type="text" class="my-input small-input1 small-input3" name="fontWeight" placeholder="FW" />
         <div class="dropdown-content maxH main-list" style="width: 50px">
          <ul class="fontWeightValues">
          </ul>
         </div>
        </div>
       </div>
      </div>
      <div class="boundaryBoder p-1 mr-1 flex al-str">
       <div class="mr-1">
        <div class="flex jc-cent">
         <div class="flex">
          <div class="dropdown">
           <input type="number" name="width" class="my-input small-input1" placeholder="W" aria-label="Width input bar" />
           <div class="dropdown-content maxH main-list" style="width: 60px">
            <ul class="widthHNumberList" aria-label="List of number values">
            </ul>
           </div>
          </div>
          <div class="dropdown mr-1">
           <input type="text" name="width" value="px" class="my-input small-input1 small-input2" disabled />
           <div class="dropdown-content maxH main-list" style="width: 50px">
            <ul class="unitList">
            </ul>
           </div>
          </div>
         </div>
         <div class="flex">
          <div class="dropdown">
           <input type="text" name="height" class="my-input small-input1" placeholder="H" />
           <div class="dropdown-content maxH main-list" style="width: 60px">
            <ul class="widthHNumberList" aria-label="List of number values">
            </ul>
           </div>
          </div>
          <div class="dropdown">
           <input type="text" name="height" value="px" class="my-input small-input1 small-input2" disabled />
           <div class="dropdown-content maxH main-list" style="width: 50px">
            <ul class="unitList">
            </ul>
           </div>
          </div>
         </div>
        </div>
        <div class="flex jc-cent">
         <div class="flex">
          <div class="dropdown">
           <input type="text" name="padding" class="my-input small-input1" placeholder="P" />
           <div class="dropdown-content maxH main-list" style="width: 60px">
            <ul class="padMarNumberList" aria-label="List of number values">
            </ul>
           </div>
          </div>
          <div class="dropdown mr-1">
           <input type="text" name="padding" value="px" class="my-input small-input1 small-input2" disabled />
           <div class="dropdown-content maxH main-list" style="width: 50px">
            <ul class="unitList">
            </ul>
           </div>
          </div>
         </div>
         <div class="flex">
          <div class="dropdown">
           <input type="text" name="margin" class="my-input small-input1" placeholder="M" aria-label="Margin input bar" />
           <div class="dropdown-content maxH main-list" style="width: 60px">
            <ul class="padMarNumberList" aria-label="List of number values">
            </ul>
           </div>
          </div>
          <div class="dropdown">
           <input type="text" name="margin" value="px" class="my-input small-input1 small-input2" disabled />
           <div class="dropdown-content maxH main-list" style="width: 50px">
            <ul class="unitList">
            </ul>
           </div>
          </div>
         </div>
        </div>
       </div>
       <div role="button" class="moreOpt">»</div>
      </div>
      <div class="boundaryBoder p-1 mr-1 flex al-str">
       <div class="mr-1">
        <div class="flex jc-cent">
         <div class="flex">
          <div class="dropdown">
           <input type="number" name="lineHeight" class="my-input small-input1" placeholder="L" aria-label="Width input bar" />
           <div class="dropdown-content maxH main-list" style="width: 60px">
            <ul class="lineHeightValueList" aria-label="List of number values">
            </ul>
           </div>
          </div>
          <div class="dropdown mr-1">
           <input type="text" name="lineHeight" value="px" class="my-input small-input1 small-input2" disabled />
           <div class="dropdown-content maxH main-list" style="width: 50px">
            <ul class="unitList">
            </ul>
           </div>
          </div>
         </div>
         <div class="flex">
          <div class="dropdown">
           <input type="number" name="letterSpacing" class="my-input small-input1" placeholder="LS" />
           <div class="dropdown-content maxH main-list" style="width: 60px">
            <ul class="lineHeightValueList" aria-label="List of number values">
            </ul>
           </div>
          </div>
          <div class="dropdown">
           <input type="text" name="letterSpacing" value="px" class="my-input small-input1 small-input2" disabled />
           <div class="dropdown-content maxH main-list" style="width: 50px">
            <ul class="unitList">
            </ul>
           </div>
          </div>
         </div>
        </div>
        <div class="flex jc-cent">
         <div class="flex">
          <div class="dropdown">
           <input type="number" name="padding" class="my-input small-input1" placeholder="P" />
           <div class="dropdown-content maxH main-list" style="width: 60px">
            <ul class="numberList" aria-label="List of number values">
            </ul>
           </div>
          </div>
          <div class="dropdown mr-1">
           <input type="text" name="padding" value="px" class="my-input small-input1 small-input2" disabled />
           <div class="dropdown-content maxH main-list" style="width: 50px">
            <ul class="unitList">
            </ul>
           </div>
          </div>
         </div>
         <div class="flex">
          <div class="dropdown">
           <input type="text" name="margin" class="my-input small-input1" placeholder="M" aria-label="Margin input bar" />
           <div class="dropdown-content maxH main-list" style="width: 60px">
            <ul class="numberList" aria-label="List of number values">
            </ul>
           </div>
          </div>
          <div class="dropdown">
           <input type="text" name="margin" value="px" class="my-input small-input1 small-input2" disabled />
           <div class="dropdown-content maxH main-list" style="width: 50px">
            <ul class="unitList">
            </ul>
           </div>
          </div>
         </div>
        </div>
       </div>
       <div role="button" class="moreOpt">»</div>
      </div>
     </div>
  
  */