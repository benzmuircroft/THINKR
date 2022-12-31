function ModalBtnApply({modal,onApply}){
    return (
        <>
            {
                (modal.editing<0)?(/* if */
                    <button className="Btn Ok" onClick={onApply}>Ok</button>
                ):(
                    (modal.editing>-1)?(/* else if */
                        <button className="Btn Edit" onClick={onApply}>Edit</button>
                    ):(/* else */
                        'nothing to do.'
                    )
                )
            }
        </>
    )
}

export default ModalBtnApply;
